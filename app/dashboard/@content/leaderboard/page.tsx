import Leaderboard from "@/app/common/leaderboard";
import RecentlyJoined from "@/app/common/recently-joined";

import Tabs from "../../_components/tabs";

export default function LeaderboardPage() {
  return (
    <>
      <Tabs activeTab="leaderboard" disabledTab="run-a-node" />

      <div className="relative mt-[60px] mb-[100px] md:my-[80px] lg:mt-[120px] lg:mb-[160px] lg w-full flex max-xl:flex-col justify-center items-start gap-x-10 px-36 max-xl:px-28 max-lg:px-20 max-sm:px-5 max-md:px-16">
        <div className="w-[60%] sm:min-w-96 max-xl:w-full">
          <h2 className="max-sm:text-center font-neuebit text-5xl text-primary-foreground mb-5 max-md:text-4xl">
            Leaderboard
          </h2>
          <Leaderboard className="transform-gpu will-change-transform border border-primary-border max-sm:py-2 max-sm:px-4 rounded-lg py-4 px-7 flex flex-col divide-y divide-[#3C71EB] backdrop-blur-2xl" />
        </div>

        <div className="w-[40%] min-w-80 max-xl:w-full">
          <h2 className="max-sm:text-center max-xl:mt-10 font-neuebit text-5xl text-primary-foreground mb-5 max-md:text-4xl">
            Recently joined
          </h2>
          <RecentlyJoined className="z-10 transform-gpu will-change-transform border border-primary-border max-sm:py-2 max-sm:px-4 rounded-lg py-4 px-7 flex flex-col divide-y divide-[#3C71EB] backdrop-blur-2xl" />
        </div>
      </div>
    </>
  );
}
