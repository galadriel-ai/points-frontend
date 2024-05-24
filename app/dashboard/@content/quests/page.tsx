"use client";

import { useEffect, useState } from "react";

import useSWR from "swr";

import {
  discordData,
  twitterData,
  wandererData,
} from "@/app/dashboard/_components/data";

import DiscordCard from "../../_components/discord-card";
import MasterBuild from "../../_components/master-build";
import QuestsCard from "../../_components/quests-card";
import QuestCardSkeleton from "../../_components/quests-card-skeleton";
import Tabs from "../../_components/tabs";
import TwitterCard from "../../_components/twitter-card";
import WalletCard from "../../_components/wallet-card";

interface questData {
  name: string;
  points: number;
  is_completed: boolean;
}

export default function QuestsPage() {
  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/dashboard/user`
  );

  const [updatedWandererData, setUpdatedWandererData] = useState(wandererData);
  const [updatedDiscordData, setUpdatedDiscordData] = useState(discordData);
  const [updatedTwitterData, setUpdatedTwitterData] = useState(twitterData);
  const [walletTask, setWalletTask] = useState<questData | null>(null);

  useEffect(() => {
    if (data?.quests) {
      const walletData = data.quests?.find(
        (q: questData) => q.name === "connect_wallet"
      );

      setWalletTask(
        walletData || { name: "connect_wallet", points: 0, is_completed: false }
      );

      const updatedWanderer = wandererData.map((quest) => {
        const questData = data.quests?.find(
          (q: questData) => q.name === quest.taskName
        );
        return {
          ...quest,
          xp: questData ? questData.points : quest.xp,
          isCompleted: questData ? questData.is_completed : quest.isCompleted,
        };
      });

      setUpdatedWandererData(updatedWanderer);

      const discordQuestData = data.quests?.find(
        (q: questData) => q.name === discordData.taskName
      );
      setUpdatedDiscordData({
        ...discordData,
        xp: discordQuestData ? discordQuestData.points : discordData.xp,
        isCompleted: discordQuestData
          ? discordQuestData.is_completed
          : discordData.isCompleted,
      });

      const twitterQuestData = data.quests?.find(
        (q: questData) => q.name === twitterData.taskName
      );
      setUpdatedTwitterData({
        ...twitterData,
        xp: twitterQuestData ? twitterQuestData.points : twitterData.xp,
        isCompleted: twitterQuestData
          ? twitterQuestData.is_completed
          : twitterData.isCompleted,
      });
    }
  }, [data]);

  return (
    <>
      <Tabs activeTab="quests" disabledTab="run-a-node" />
      <div className="flex flex-col gap-20 md:gap-28 lg:gap-36 px-36 max-lg:px-20 max-sm:px-5 max-md:px-16 mt-[60px] mb-[100px] md:my-[80px] lg:mt-[120px] lg:mb-[160px]">
        <div className="flex flex-col gap-10 md:gap-16 lg:gap-20">
          <h1 className="font-neuebit text-[80px] max-lg:text-7xl max-md:text-6xl max-sm:text-5xl text-primary-foreground leading-[60px] max-sm:leading-[40px]">
            Complete quests to earn Gem points
          </h1>
          <div className="flex flex-col gap-5 md:gap-8 lg:gap-10">
            <h2 className="font-mondwest text-2xl md:text-3xl lg:text-[40px] text-primary-foreground">
              Wanderer- engage with Galadriel Devnet
            </h2>
            <div className="flex flex-wrap items-start gap-2.5 md:gap-5 lg:gap-10">
              {isLoading || error ? (
                <QuestCardSkeleton />
              ) : (
                <WalletCard
                  points={walletTask?.points || 0}
                  isCompleted={walletTask?.is_completed || false}
                />
              )}
              {isLoading || error
                ? [...Array(3)].map((_, index) => (
                    <QuestCardSkeleton key={index} />
                  ))
                : updatedWandererData.map((quest, index) => (
                    <QuestsCard key={index} quest={quest} />
                  ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 md:gap-8 lg:gap-10">
          <h2 className="font-mondwest text-2xl md:text-3xl lg:text-[40px] text-primary-foreground">
            Messenger - join the movement
          </h2>
          <div className="flex flex-wrap gap-2.5 md:gap-5 lg:gap-10">
            {isLoading || error ? (
              <QuestCardSkeleton />
            ) : (
              <DiscordCard quest={updatedDiscordData} />
            )}
            {isLoading || error ? (
              <QuestCardSkeleton />
            ) : (
              <TwitterCard quest={updatedTwitterData} />
            )}
          </div>
        </div>
        <MasterBuild />
      </div>
    </>
  );
}
