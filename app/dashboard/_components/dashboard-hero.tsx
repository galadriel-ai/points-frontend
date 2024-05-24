"use client";

import useSWR from "swr";

export default function DashboardHero() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/dashboard/user`
  );

  const totalPoints = data?.total_points || 0;
  const xUsername = data?.x_username || "<X handle>";

  return (
    <div className="px-36 max-xl:px-28 max-lg:px-20 max-sm:px-5 max-md:px-16 max-sm:mt-8">
      <h2 className="text-[80px] font-mondwest text-primary-foreground max-lg:text-7xl max-md:text-6xl max-sm:text-[40px]">
        gm{" "}
        {isLoading ? (
          <span className="animate-pulse">&lt;X handle&gt;</span>
        ) : (
          `${xUsername}`
        )}
      </h2>
      <div className="flex justify-center items-start gap-10 mt-5 lg:mt-10 max-md:flex-col">
        <p className="w-[50%] max-md:w-full text-left text-2xl max-lg:text-xl max-md:text-lg max-sm:text-base max-sm:font-medium text-primary-foreground">
          As a fellow Galadrian, you’re joining the mission to build a safe,
          user-owned AI.
        </p>
        <div className="w-[50%] max-md:w-full flex flex-col justify-center items-end max-md:items-start">
          <p className="text-xl max-lg:text-lg max-md:text-base max-sm:text-sm max-sm:font-medium text-primary-foreground">
            Your gem points:
          </p>
          <div className="text-primary-hover font-neuebit text-[330px] leading-[300px] max-lg:text-[300px] max-lg:leading-[270px] max-md:text-[270px] max-md:leading-[240px] max-sm:text-[200px] max-sm:leading-[200px] flex items-center justify-center">
            {isLoading ? (
              <span className="animate-pulse text-[#2E91D7]">0</span>
            ) : error ? (
              <span className="text-red-500">X</span>
            ) : (
              totalPoints
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
