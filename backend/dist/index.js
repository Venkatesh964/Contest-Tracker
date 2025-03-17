"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const query = `query getContestList {
    allContests {
    title
    startTime
    duration
    titleSlug
    }
}`;
const leetcodeUrl = "https://leetcode.com/";
const codechefUrl = "https://www.codechef.com/";
const codeforcesUrl = "https://codeforces.com/";
function leetcodeContests() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post("https://leetcode.com/graphql", {
                query: query,
            });
            const futureContests = response.data.data.allContests
                .filter((contest) => new Date(contest.startTime * 1000) > new Date())
                .map((contest) => ({
                platform: "Leetcode",
                title: contest.title,
                startTimeUnix: contest.startTime,
                startTime: new Date(contest.startTime * 1000).toISOString(),
                duration: contest.duration,
                url: `${leetcodeUrl}/contest/` + contest.titleSlug,
            }));
            const pastContests = response.data.data.allContests
                .filter((contest) => new Date(contest.startTime * 1000) < new Date())
                .map((contest) => ({
                platform: "Leetcode",
                title: contest.title,
                startTimeUnix: contest.startTime,
                startTime: new Date(contest.startTime * 1000).toISOString(),
                duration: contest.duration,
                url: `${leetcodeUrl}/contest/` + contest.titleSlug,
            }));
            return { futureContests, pastContests };
        }
        catch (e) {
            console.log("Error while fetching leetcode contest details ", e.message);
            return { futureContests: [], pastContests: [] };
        }
    });
}
function codeforcesContests() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get("https://codeforces.com/api/contest.list");
            // console.log(response);
            if (response.data.status !== "OK") {
                throw new Error("Couldn't fetch codeforces contest details");
            }
            const pastContests = response.data.result
                .filter((contest) => contest.phase !== "BEFORE")
                .map((contest) => ({
                platform: "Codeforces",
                title: contest.name,
                startTimeUnix: contest.startTimeSeconds,
                startTime: new Date(contest.startTimeSeconds * 1000).toISOString(),
                duration: contest.durationSeconds,
                url: `${codeforcesUrl}/contests/` + contest.id,
            }));
            const futureContests = response.data.result
                .filter((contest) => contest.phase === "BEFORE")
                .map((contest) => ({
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
        }
        catch (e) {
            console.log("Error while fetching codeforces contests list ", e.message);
            return { futureContests: [], pastContests: [] };
        }
    });
}
function codechefContests() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.get("https://www.codechef.com/api/list/contests/all");
            if (response.data.status !== "success")
                throw new Error("Couldn't fetch codechef contest details");
            const futureContests = response.data.future_contests.map((contest) => ({
                platform: "Codechef",
                title: contest.contest_name,
                startTimeUnix: contest.contest_start_date_iso,
                startTime: new Date(contest.contest_start_date).toISOString(),
                duration: contest.contest_duration,
                url: `${codechefUrl}/contests/` + contest.contest_code,
            }));
            const pastContests = response.data.past_contests.map((contest) => ({
                platform: "Codechef",
                title: contest.contest_name,
                startTimeUnix: contest.contest_start_date_iso,
                startTime: new Date(contest.contest_start_date).toISOString(),
                duration: contest.contest_duration,
                url: `${codechefUrl}/contests/` + contest.contest_code,
            }));
            return { futureContests, pastContests };
        }
        catch (e) {
            console.log("Error while fetching codechef contests", e.message);
            return { futureContests: [], pastContests: [] };
        }
    });
}
app.get("/api/v1/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [codechef, codeforces, leetcode] = yield Promise.all([
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
    }
    catch (e) {
        res.status(500).json({
            message: "Server error while fetching all contest details",
        });
    }
}));
app.get("/api/v1/codeforces", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield codeforcesContests();
        res.json({
            data: response,
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Server Error while fetching codeforces contest details",
        });
    }
}));
app.get("/api/v1/codechef", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield codechefContests();
        res.json({ data });
    }
    catch (e) {
        res.status(500).json({
            message: "Server Error while fetching codechef contest details",
        });
    }
}));
app.get("/api/v1/leetcode", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield leetcodeContests();
        res.json({
            data,
        });
    }
    catch (e) {
        res.status(500).json({
            message: "Server Error while fetching leetcode contest details",
        });
    }
}));
app.listen(3000, () => console.log("listening on port 3000"));
