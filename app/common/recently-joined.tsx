"use client";
import { useState } from "react";

import { formatDistanceToNowStrict, parseISO } from "date-fns";
import useSWR from "swr";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function Leaderboard({ className }: { className: string }) {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/dashboard`
  );
  const [showAfter5, setShowAfter5] = useState(false);
  const [showAfter3, setShowAfter3] = useState(false);

  if (isLoading) {
    return (
      <ul className={className}>
        {[1, 2, 3, 4, 5].map((_, index) => (
          <RecentlyJoinedSkeleton key={index} />
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

  interface RecentlyJoinedData {
    x_username: string;
    profile_image_url: string;
    joined_at: string;
  }
  return (
    <ul className={className}>
      {data.recently_joined_users
        .slice(0, 5)
        .map((data: RecentlyJoinedData, index: number) => (
          <RecentlyJoinedItem
            key={index}
            x_username={data.x_username}
            profile_image_url={data.profile_image_url}
            referredBy={data.x_username}
            joined_at={data.joined_at}
            className={index > 2 ? "max-sm:hidden" : ""}
          />
        ))}
      {showAfter5 &&
        data.recently_joined_users
          .slice(5)
          .map((data: RecentlyJoinedData, index: number) => (
            <RecentlyJoinedItem
              key={index}
              x_username={data.x_username}
              profile_image_url={data.profile_image_url}
              referredBy={data.x_username}
              joined_at={data.joined_at}
            />
          ))}
      {showAfter3 &&
        data.recently_joined_users
          .slice(3)
          .map((data: RecentlyJoinedData, index: number) => (
            <RecentlyJoinedItem
              key={index}
              x_username={data.x_username}
              profile_image_url={data.profile_image_url}
              referredBy={data.x_username}
              joined_at={data.joined_at}
            />
          ))}
      {data.recently_joined_users.length > 5 && (
        <li className="w-full py-2 flex justify-end max-sm:justify-center max-sm:hidden">
          <Button
            variant="link"
            className="text-primary-foreground underline hover:text-primary-hover"
            onClick={() => setShowAfter5(!showAfter5)}
          >
            {showAfter5 ? "See less" : "See more"}
          </Button>
        </li>
      )}
      {data.recently_joined_users.length > 3 && (
        <li className="w-full py-2 flex justify-end max-sm:justify-center sm:hidden">
          <Button
            variant="link"
            className="text-primary-foreground underline hover:text-primary-hover"
            onClick={() => setShowAfter3(!showAfter3)}
          >
            {showAfter3 ? "See less" : "See more"}
          </Button>
        </li>
      )}
    </ul>
  );
}

const RecentlyJoinedSkeleton = () => {
  return (
    <li className="flex items-center h-[69px] w-full p-2">
      <Skeleton className="h-12 w-12 rounded-full bg-[#2E91D7]" />
      <div className="space-y-2 ml-4">
        <Skeleton className="h-4 w-[150px] bg-[#2E91D7]" />
        <Skeleton className="h-4 w-[110px] bg-[#2E91D7]" />
      </div>
    </li>
  );
};

interface RecentlyJoinedListProps {
  x_username: string;
  profile_image_url: string;
  referredBy: string;
  joined_at: string;
  className?: string;
}

const RecentlyJoinedItem: React.FC<RecentlyJoinedListProps> = ({
  x_username,
  profile_image_url,
  referredBy,
  joined_at,
  className,
}) => {
  const timeAgo = (joinedAt: string) => {
    const joinedDate = parseISO(joinedAt);
    const timeAgo = formatDistanceToNowStrict(joinedDate);
    return timeAgo;
  };

  return (
    <li
      className={cn("flex justify-start items-center py-2 w-full", className)}
    >
      <div className="flex items-center">
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
          <p className="text-primary-foreground font-medium text-sm max-sm:leading-[1.2] md:text-base">
            {x_username}
          </p>
          <div className="flex mt-1 flex-col max-sm:flex-row">
            <p className="text-xs text-primary-foreground/70 hidden">
              REFERRED BY: &nbsp;
            </p>
            <p className="text-xs text-primary-foreground/70">@{referredBy}</p>
          </div>
          <h2 className="hidden max-sm:block max-sm:text-sm mt-1 ml-auto text-primary-foreground font-medium">
            {timeAgo(joined_at)}
          </h2>
        </div>
      </div>
      <h2 className="max-sm:hidden ml-auto text-primary-foreground font-medium">
        {timeAgo(joined_at)} ago
      </h2>
    </li>
  );
};
