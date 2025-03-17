import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

type codeforcesContest = {
  id: number;
  name: string;
  phase: string;
  durationSeconds: number;
  startTimeSeconds: number;
  relativeTimeSeconds: number;
};

type codechefContest = {
  contest_name: string;
  contest_start_date_iso: string;
  contest_start_date: string;
  contest_duration: number;
  contest_code: string;
};
const query = `query getContestList {
    allContests {
    title
    startTime
    duration
    titleSlug
    }
}`;

type leetcodeContest = {
  title: string;
  startTime: number | 1743258600;
  duration: number | 5400;
  titleSlug: string;
};
const leetcodeUrl = "https://leetcode.com/";
const codechefUrl = "https://www.codechef.com/";
const codeforcesUrl = "https://codeforces.com/";

async function leetcodeContests() {
  try {
    const response = await axios.post("https://leetcode.com/graphql", {
      query: query,
    });
    const futureContests = response.data.data.allContests
      .filter(
        (contest: leetcodeContest) =>
          new Date(contest.startTime * 1000) > new Date()
      )
      .map((contest: leetcodeContest) => ({
        platform: "Leetcode",
        title: contest.title,
        startTimeUnix: contest.startTime,
        startTime: new Date(contest.startTime * 1000).toISOString(),
        duration: contest.duration,
        url: `${leetcodeUrl}/contest/` + contest.titleSlug,
      }));

    const pastContests = response.data.data.allContests
      .filter(
        (contest: leetcodeContest) =>
          new Date(contest.startTime * 1000) < new Date()
      )
      .map((contest: leetcodeContest) => ({
        platform: "Leetcode",
        title: contest.title,
        startTimeUnix: contest.startTime,
        startTime: new Date(contest.startTime * 1000).toISOString(),
        duration: contest.duration,
        url: `${leetcodeUrl}/contest/` + contest.titleSlug,
      }));

    return { futureContests, pastContests };
  } catch (e: any) {
    console.log("Error while fetching leetcode contest details ", e.message);
    return { futureContests: [], pastContests: [] };
  }
}

async function codeforcesContests() {
  try {
    const response = await axios.get("https://codeforces.com/api/contest.list");
    // console.log(response);
    if (response.data.status !== "OK") {
      throw new Error("Couldn't fetch codeforces contest details");
    }
    const pastContests = response.data.result
      .filter((contest: codeforcesContest) => contest.phase !== "BEFORE")
      .map((contest: codeforcesContest) => ({
        platform: "Codeforces",
        title: contest.name,
        startTimeUnix: contest.startTimeSeconds,
        startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
        duration: contest.durationSeconds,
        url: `${codeforcesUrl}/contests/` + contest.id,
      }));
    const futureContests = response.data.result
      .filter((contest: codeforcesContest) => contest.phase === "BEFORE")
      .map((contest: codeforcesContest) => ({
        platform: "Codeforces",
        title: contest.name,
        startTimeUnix: contest.startTimeSeconds,
        startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
        duration: contest.durationSeconds,
        url: `${codeforcesUrl}/contests/` + contest.id,
      }));

    return {
      futureContests,
      pastContests,
    };
  } catch (e: any) {
    console.log("Error while fetching codeforces contests list ", e.message);
    return { futureContests: [], pastContests: [] };
  }
}

async function codechefContests() {
  try {
    const response = await axios.get(
      "https://www.codechef.com/api/list/contests/all"
    );

    if (response.data.status !== "success")
      throw new Error("Couldn't fetch codechef contest details");

    const futureContests = response.data.future_contests.map(
      (contest: codechefContest) => ({
        platform: "Codechef",
        title: contest.contest_name,
        startTimeUnix: contest.contest_start_date_iso,
        startTime: new Date(contest.contest_start_date).toISOString(),
        duration: contest.contest_duration,
        url: `${codechefUrl}/contests/` + contest.contest_code,
      })
    );

    const pastContests = response.data.past_contests.map((contest: any) => ({
      platform: "Codechef",
      title: contest.contest_name,
      startTimeUnix: contest.contest_start_date_iso,
      startTime: new Date(contest.contest_start_date).toISOString(),
      duration: contest.contest_duration,
      url: `${codechefUrl}/contests/` + contest.contest_code,
    }));
    return { futureContests, pastContests };
  } catch (e: any) {
    console.log("Error while fetching codechef contests", e.message);
    return { futureContests: [], pastContests: [] };
  }
}

app.get("/api/v1/", async (req, res) => {
  try {
    const [codechef, codeforces, leetcode] = await Promise.all([
      codechefContests(),
      codeforcesContests(),
      leetcodeContests(),
    ]);
    const futureContests = [
      ...codechef.futureContests,
      ...codeforces.futureContests,
      ...leetcode.futureContests,
    ];
    const pastContests = [
      ...codechef.pastContests,
      ...codeforces.pastContests,
      ...leetcode.pastContests,
    ];
    res.json({
      data: {
        futureContests,
        pastContests,
      },
    });
  } catch (e: any) {
    res.status(500).json({
      message: "Server error while fetching all contest details",
    });
  }
});
app.get("/api/v1/codeforces", async (req, res) => {
  try {
    const response = await codeforcesContests();
    res.json({
      data: response,
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error while fetching codeforces contest details",
    });
  }
});

app.get("/api/v1/codechef", async (req, res) => {
  try {
    const data = await codechefContests();
    res.json({ data });
  } catch (e) {
    res.status(500).json({
      message: "Server Error while fetching codechef contest details",
    });
  }
});

app.get("/api/v1/leetcode", async (req, res) => {
  try {
    const data = await leetcodeContests();
    res.json({
      data,
    });
  } catch (e) {
    res.status(500).json({
      message: "Server Error while fetching leetcode contest details",
    });
  }
});

app.listen(3000, () => console.log("listening on port 3000"));
