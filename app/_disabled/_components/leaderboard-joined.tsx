import Image from "next/image";

import Leaderboard from "@/app/common/leaderboard";
import RecentlyJoined from "@/app/common/recently-joined";
import GVector from "@/public/assets/home/leaderboard-g.svg";

export default function LeaderboardJoined() {
  return (
    <div className="relative w-full pt-24 flex max-xl:flex-col justify-center items-start gap-x-10">
      <Image
        src={GVector}
        alt="G vector"
        className="absolute top-0 xl:top-20 left-0 z-10 bg-cover w-full"
      />
      <div className="relative z-20 w-[60%] sm:min-w-96 max-xl:w-full">
        <h2 className="max-sm:text-center font-neuebit text-5xl text-primary-foreground mb-5 max-md:text-4xl">
          Leaderboard
        </h2>
        <Leaderboard className="border border-primary-border max-sm:py-2 max-sm:px-4 rounded-lg py-4 px-7 flex flex-col divide-y divide-[#3C71EB] backdrop-blur-2xl" />
      </div>

      <div className="relative z-20 w-[40%] min-w-80 max-xl:w-full">
        <h2 className="max-sm:text-center max-xl:mt-10 font-neuebit text-5xl text-primary-foreground mb-5 max-md:text-4xl">
          Recently joined
        </h2>
        <RecentlyJoined className="border border-primary-border max-sm:py-2 max-sm:px-4 rounded-lg py-4 px-7 flex flex-col divide-y divide-[#3C71EB] backdrop-blur-2xl" />
      </div>
    </div>
  );
}
