"use client";
import { useState } from "react";

import Image from "next/image";
import useSWR from "swr";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import DiamondBadge from "@/public/assets/diamond.svg";
import HeartBadge from "@/public/assets/heart.svg";
import TrophyBadge from "@/public/assets/trophy.svg";

export default function Leaderboard({ className }: { className: string }) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/dashboard`
  );
  const [showAfter10, setShowAfter10] = useState(false);
  const [showAfter5, setShowAfter5] = useState(false);

  if (isLoading) {
    return (
      <ul className={className}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
          <LeaderboardSkeleton key={index} />
        ))}
      </ul>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "flex items-center justify-center h-20 w-full p-2",
          className
        )}
      >
        <p className="text-primary-foreground">Error: {error.message}</p>
      </div>
    );
  }

  interface LeaderboardData {
    x_username: string;
    profile_image_url: string;
    points: number;
  }

  return (
    <ul className={className}>
      {data.leaderboard_users
        .slice(0, 10)
        .map((data: LeaderboardData, index: number) => (
          <LeaderboardItem
            key={index}
            slNo={index + 1}
            name={data.x_username}
            profile_image_url={data.profile_image_url}
            x_username={data.x_username}
            points={data.points}
            className={index > 4 ? "max-sm:hidden" : ""}
          />
        ))}
      {showAfter10 &&
        data.leaderboard_users
          .slice(10)
          .map((data: LeaderboardData, index: number) => (
            <LeaderboardItem
              key={index}
              slNo={index + 1 + 10}
              name={data.x_username}
              profile_image_url={data.profile_image_url}
              x_username={data.x_username}
              points={data.points}
            />
          ))}
      {showAfter5 &&
        data.leaderboard_users
          .slice(5)
          .map((data: LeaderboardData, index: number) => (
            <LeaderboardItem
              key={index}
              slNo={index + 1 + 5}
              name={data.x_username}
              profile_image_url={data.profile_image_url}
              x_username={data.x_username}
              points={data.points}
            />
          ))}
      {data.leaderboard_users.length > 10 && (
        <li className="w-full py-2 flex justify-end max-sm:justify-center max-sm:hidden">
          <Button
            variant="link"
            className="text-primary-foreground underline hover:text-primary-hover"
            onClick={() => setShowAfter10(!showAfter10)}
          >
            {showAfter10 ? "See less" : "See more"}
          </Button>
        </li>
      )}
      {data.leaderboard_users.length > 5 && (
        <li className="w-full py-2 flex justify-end max-sm:justify-center sm:hidden">
          <Button
            variant="link"
            className="text-primary-foreground underline hover:text-primary-hover"
            onClick={() => setShowAfter5(!showAfter5)}
          >
            {showAfter5 ? "See less" : "See more"}
          </Button>
        </li>
      )}
    </ul>
  );
}

const LeaderboardSkeleton = () => {
  return (
    <li className="flex items-center h-[69px] w-full p-2">
      <Skeleton className="h-12 w-12 rounded-full bg-[#2E91D7]" />
      <div className="space-y-2 ml-4">
        <Skeleton className="h-4 w-[250px] bg-[#2E91D7]" />
        <Skeleton className="h-4 w-[200px] bg-[#2E91D7]" />
      </div>
    </li>
  );
};

interface LeaderboardListProps {
  slNo: number;
  name: string;
  x_username: string;
  profile_image_url: string;
  points: number;
  className?: string;
}

const LeaderboardItem: React.FC<LeaderboardListProps> = ({
  slNo,
  name,
  x_username,
  profile_image_url,
  points,
  className,
}) => {
  const formatPoints = (points: number): string => {
    if (points >= 1000) {
      return `${(points / 1000).toFixed(1)}K`;
    }
    return points.toString();
  };

  return (
    <li
      className={cn("flex justify-start items-center py-2 w-full", className)}
    >
      <span className="font-neuebit max-sm:w-4 max-md:w-6 w-8 text-primary-foreground text-4xl max-sm:text-2xl max-md:text-3xl">
        {slNo}
      </span>
      <div className="flex items-center ml-5 max-sm:ml-4">
        <Avatar className="p-[2px] bg-border-gradient w-[42px] h-[42px]">
          <AvatarImage
            src={profile_image_url}
            alt={x_username}
            className="rounded-full"
          />
          <AvatarFallback className="rounded-full">
            {x_username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <p className="text-primary-foreground font-medium text-sm max-sm:leading-[1.2] md:text-base lg:text-xl">
            {name}
          </p>
          <p className="text-primary-foreground/70 max-sm:text-xs max-md:text-sm">
            @{x_username}
          </p>
          <span className="max-sm:block hidden mt-1 ml-auto text-primary-foreground font-medium text-sm max-sm:leading-[1.2] md:text-base lg:text-xl">
            {formatPoints(points)} Gems
          </span>
        </div>
      </div>
      <div className="flex max-sm:flex-row-reverse ml-5 max-sm:ml-auto">
        {slNo < 4 && (
          <Image
            src={DiamondBadge}
            alt="trophy"
            className="relative left-0 h-6 w-6 lg:h-8 lg:w-8"
          />
        )}
        {slNo < 3 && (
          <Image
            src={HeartBadge}
            alt="trophy"
            className="relative right-2 h-6 w-6 lg:h-8 lg:w-8 max-sm:left-2"
          />
        )}
        {slNo < 2 && (
          <Image
            src={TrophyBadge}
            alt="trophy"
            className="relative right-4 h-6 w-6 lg:h-8 lg:w-8 max-sm:left-4"
          />
        )}
      </div>
      <span className="max-sm:hidden ml-auto text-primary-foreground font-medium text-sm max-sm:leading-[1.2] md:text-base lg:text-xl">
        {formatPoints(points)} Gems
      </span>
    </li>
  );
};
