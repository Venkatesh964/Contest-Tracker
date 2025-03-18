import { useEffect, useState } from "react";
import { ContestCard } from "./ContestCard";
import axios from "axios";
import { Filter } from "./Filter";

const backendUrl = import.meta.env.VITE_BASE_URL;

export type contest = {
  platform: string;
  title: string;
  startTimeUnix: string;
  startTime: string;
  duration: string;
  url: string;
};

export const Contests = () => {
  const [allContests, setAllContests] = useState<{
    futureContests: [];
    pastContests: [];
    ongoingContests: [];
  }>();
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    codeforces: true,
    codechef: true,
    leetcode: true,
  });

  async function getUpcomingContests() {
    const response = await axios.get(`${backendUrl}api/v1`);
    //console.log(response);
    setAllContests(response.data.data);
    setLoading(false);
  }
  useEffect(() => {
    getUpcomingContests();
  }, []);

  const filteredData = [
    {
      futureContests: allContests?.futureContests.filter((contest: contest) => {
        if (filters.codechef && contest.platform === "Codechef") return true;
        else if (filters.codeforces && contest.platform === "Codeforces")
          return true;
        else if (filters.leetcode && contest.platform === "Leetcode")
          return true;
      }),
    },
    {
      pastContests: allContests?.pastContests.filter((contest: contest) => {
        if (filters.codechef && contest.platform === "Codechef") return true;
        else if (filters.codeforces && contest.platform === "Codeforces")
          return true;
        else if (filters.leetcode && contest.platform === "Leetcode")
          return true;
      }),
    },
    {
      ongoingContests: allContests?.futureContests.filter(
        (contest: contest) => {
          if (filters.codechef && contest.platform === "Codechef") return true;
          else if (filters.codeforces && contest.platform === "Codeforces")
            return true;
          else if (filters.leetcode && contest.platform === "Leetcode")
            return true;
        }
      ),
    },
  ];
  console.log(filteredData);
  if (loading) return <div>loading....</div>;
  return (
    <div className="flex max-w-7xl mx-auto gap-4 pt-4">
      <Filter filters={filters} setFilters={setFilters} />
      <div className="w-11/14 px-2">
        <div className="text-2xl font-semibold"> All Contests </div>
        <div className="flex gap-2 py-6">
          <div className="text-xl font-semibold "> Upcoming Contests</div>
          <button className="  border border-slate-100 text-white font-bold bg-blue-500 rounded-full px-3 flex items-center">
            {filteredData[0].futureContests?.length}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          {filteredData[0]?.futureContests?.map((contest: contest) => (
            <div className="col-span-1">
              <ContestCard contest={contest} />
            </div>
          ))}
        </div>
        <div className="flex gap-2 py-6">
          <div className="text-2xl font-semibold ">Past Contests</div>
          <button className="  border border-slate-100 text-white font-bold bg-blue-500 rounded-full px-3 flex items-center">
            {filteredData[1].pastContests?.length}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 ">
          {filteredData[1]?.pastContests?.map((contest: contest) => (
            <div className="col-span-1">
              <ContestCard contest={contest} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
