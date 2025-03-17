import { useEffect, useState } from "react";
import { ContestCard } from "./ContestCard";
import axios from "axios";

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
  const [upcomingContests, setUpComingContest] = useState([]);
  async function getUpcomingContests() {
    const response = await axios.get(`${backendUrl}api/v1`);
    //console.log(response);
    setUpComingContest(response.data.data.futureContests);
  }
  useEffect(() => {
    getUpcomingContests();
  }, []);
  console.log(upcomingContests);
  return (
    <div className="w-11/14 px-2">
      <div className="text-2xl font-semibold"> All Contests </div>
      <div className="flex gap-2 py-6">
        <div className="text-xl font-semibold "> Upcoming Contests</div>
        <button className="  border border-slate-100 text-white font-bold bg-blue-500 rounded-full px-3 flex items-center">
          8
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {upcomingContests.map((contest: contest) => (
          <div className="col-span-1">
            <ContestCard contest={contest} />
          </div>
        ))}
      </div>
      <div className="text-xl font-semibold">Past Contests</div>
    </div>
  );
};
