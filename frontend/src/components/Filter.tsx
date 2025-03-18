import { FunnelIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button2 } from "./Button2";

export const Filter = ({
  filters,
  setFilters,
}: {
  filters: {
    codeforces: boolean;
    codechef: boolean;
    leetcode: boolean;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      codeforces: boolean;
      codechef: boolean;
      leetcode: boolean;
    }>
  >;
}) => {
  return (
    <div className="w-3/14">
      <div className=" border border-slate-200 rounded-md p-3 ">
        <div className="font-bold text-md pb-2">Filter Contests</div>
        <div className="border border-slate-200 rounded-md p-2">
          <div className="flex gap-1 items-center py-1">
            <div>
              <FunnelIcon className="size-4 text-blue-600" />
            </div>
            <div className="text-sm font-medium">Filters</div>
          </div>

          <div className="text-gray-400 text-sm py-1">Platforms</div>
          <div className="flex flex-wrap gap-1">
            <Button2
              children={"Codeforces"}
              onClick={() => {
                setFilters((prevFilter) => ({
                  ...prevFilter,
                  codeforces: !prevFilter.codeforces,
                }));
              }}
              color={`${
                filters.codeforces ? "bg-blue-500" : "bg-blue-200"
              }  text-white`}
            />
            <Button2
              children={"CodeChef"}
              onClick={() => {
                setFilters((prevFilter) => ({
                  ...prevFilter,
                  codechef: !prevFilter.codechef,
                }));
              }}
              color={`${
                filters.codechef ? "bg-green-500" : "bg-green-200"
              }  text-white`}
            />
            <Button2
              children={"Leetcode"}
              onClick={() => {
                setFilters((prevFilter) => ({
                  ...prevFilter,
                  leetcode: !prevFilter.leetcode,
                }));
              }}
              color={`${
                filters.leetcode ? "bg-orange-500" : "bg-orange-200"
              }  text-white`}
            />
          </div>
          <div className="text-sm text-slate-400 pt-2 pb-1">Status</div>
          <div className="flex flex-wrap gap-1.5 pb-1">
            <Button2
              children={"All"}
              onClick={() => console.log("hello")}
              color={"bg-blue-500 text-white"}
            />
            <Button2
              children={"Upcoming"}
              onClick={() => console.log("hello")}
              color={""}
            />
            <Button2
              children={"Ongoing"}
              onClick={() => console.log("hello")}
              color={""}
            />
            <Button2
              children={"Past"}
              onClick={() => console.log("hello")}
              color={""}
            />
          </div>
        </div>
        <div className="flex pt-4 justify-between gap-6">
          <div className="flex border border-slate-200 rounded-md px-2 py-0.5 gap-2 cursor-pointer w-4/6 justify-center">
            <div className="flex items-center  ">
              <ArrowPathIcon className="size-4 " />
            </div>
            <div className="flex items-center text-sm">Refresh</div>
          </div>
          <div className="text-slate-400 border border-slate-300 rounded-md text-sm px-2 py-0.5 cursor-pointer w-2/6 flex justify-center">
            Reset
          </div>
        </div>
      </div>
    </div>
  );
};
