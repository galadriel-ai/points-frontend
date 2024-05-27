import { StaticImageData } from "next/image";

import CodingIcon from "@/public/assets/quests/coding.svg";
import ContactIcon from "@/public/assets/quests/contact.svg";
import ContentIcon from "@/public/assets/quests/content.svg";
import DiscordIcon from "@/public/assets/quests/discord.svg";
import FlashIcon from "@/public/assets/quests/flash.svg";
import HeartIcon from "@/public/assets/quests/heart.svg";
import SunGlassIcon from "@/public/assets/quests/sunglass.svg";
import XIcon from "@/public/assets/quests/x.svg";

export interface QuestData {
  xp: number;
  title: string;
  icon: StaticImageData;
  description: string;
  tip: string;
  isCompleted?: boolean;
  link: string;
  taskName?: string;
}

export const wandererData: QuestData[] = [
  {
    xp: 0,
    title: "gem points",
    icon: HeartIcon,
    description: "Use the faucet to get funds of devnet",
    tip: "Use faucet",
    link: process.env.NEXT_PUBLIC_FAUCET_URL!,
    taskName: "used_faucet",
  },
  {
    xp: 0,
    title: "gem points",
    icon: FlashIcon,
    description: "Make a tx with decentralized AI app on Galadriel devnet",
    tip: "See dApps",
    link: process.env.NEXT_PUBLIC_DAPPS_URL!,
    taskName: "make_tx",
  },
  {
    xp: 0,
    title: "gem points",
    icon: ContactIcon,
    description: "Deploy a contract on the Galadriel devnet",
    tip: "See quickstart",
    link: process.env.NEXT_PUBLIC_QUICKSTART_URL!,
    taskName: "deploy_contract",
  },
];

export const discordData: QuestData = {
  xp: 0,
  title: "gem points",
  icon: DiscordIcon,
  description: "Connect Discord",
  tip: "Connect",
  isCompleted: false,
  link: `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/discord/link`,
  taskName: "join_discord",
};

export const twitterData: QuestData = {
  xp: 0,
  title: "gem points",
  icon: XIcon,
  description: "Follow Galadriel",
  tip: "Follow",
  link: process.env.NEXT_PUBLIC_X_COM_URL!,
  taskName: "follow_galardiel_on_x",
};

export interface MasterBuildData {
  xp: number;
  isXpFixed?: boolean;
  title: string;
  icon: StaticImageData;
  description: string;
}

export const masterBuildData: MasterBuildData[] = [
  {
    xp: 500,
    isXpFixed: true,
    title: "gem points",
    icon: CodingIcon,
    description: "Build a decentralized AI app/agent on Galadriel Devnet",
  },
  {
    xp: 200,
    title: "gem points",
    icon: ContentIcon,
    description:
      "Create Galadriel content: art, memes, X thread, blog post, etc.",
  },
  {
    xp: 200,
    title: "gem points",
    icon: SunGlassIcon,
    description:
      "Vibe with Galadrians, discuss Web3xAI and welcome newcomers on our Discord",
  },
];
