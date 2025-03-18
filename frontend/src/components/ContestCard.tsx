import {
  BookmarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { Button2 } from "./Button2";
import { contest } from "./Contests";

// const date = new Date();
// const time = 5.5 * 60 * 60;
// const ISTDate = new Date(date.getTime() + time);

const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const ContestCard = ({ contest }: { contest: contest }) => {
  const date = new Date(contest.startTime);
  const time = 5.5 * 60 * 60;
  const ISTDate = new Date(date.getTime() + time);
  const getDatefromString =
    days[ISTDate.getDay()] +
    "," +
    ISTDate.getDate() +
    " " +
    months[ISTDate.getMonth()] +
    " , " +
    (ISTDate.getHours() > 12
      ? ISTDate.getHours() - 12 + " : " + ISTDate.getMinutes() + " PM "
      : ISTDate.getHours() + " : " + ISTDate.getMinutes() + " AM ") +
    "(IST)";
  const timeInHours = Number(contest.duration) / 60;

  const duration =
    timeInHours > 0
      ? Math.floor(timeInHours) + " h "
      : "" + (Number(contest.duration) - Math.floor(timeInHours)) + " m ";
  return (
    <div className="col-span-3 ">
      <div className="border border-slate-100 shadow-md rounded-lg p-4">
        <div className="flex justify-between px-0.5">
          <div className="flex flex-wrap gap-2 ">
            <Button2
              children={contest.platform}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              color={"text-orange-400 bg-orange-100"}
            />
            <Button2
              children={"Upcoming"}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              color={"text-blue-400 bg-blue-100"}
            />
            <Button2
              children={"BiWeekly"}
              onClick={function (): void {
                throw new Error("Function not implemented.");
              }}
              color={"text-blue-400 bg-blue-100"}
            />
          </div>
          <div className="flex items-center">
            {<BookmarkIcon className="size-4" />}
          </div>
        </div>
        <div className="text-lg font-bold py-3 ">{contest.title} </div>
        <div className="flex gap-2 py-1">
          <div className="flex items-center">
            <CalendarDaysIcon className="text-blue-400 size-4" />
          </div>
          <div className="text-slate-300 text-lg">Start:</div>
        </div>
        <div className="font-medium pl-8">{getDatefromString}</div>
        <div className="flex gap-2 py-3">
          <div className="flex items-center">
            <ClockIcon className="size-4" />
          </div>
          <div className="flex items-center">
            Starts in {2 + " h " + 30 + " m " + 4 + " s "}
          </div>
        </div>
        <div className="flex gap-1 pt-2">
          <div className="text-slate-500">Duration : </div>
          <div className="pb-2">{duration}</div>
        </div>

        <div className="py-2">
          <a
            className="border border-slate-100 bg-blue-400 text-white flex justify-center items-center gap-2 rounded-md px-2 py-1 cursor-pointer"
            href={contest.url}
            target="_blank"
          >
            <div className="flex items-center">
              <TrophyIcon className="size-4" />
            </div>
            <div className="text-sm font-md"> Join Contest</div>
          </a>
        </div>
      </div>
    </div>
  );
};
