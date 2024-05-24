import Image from "next/image";

import { cn } from "@/lib/utils";
import TickIcon from "@/public/assets/quests/tick-blue.svg";
import WalletIcon from "@/public/assets/quests/wallet.svg";

import ConnectWallet from "./connect-wallet";

interface WalletCardProps {
  points: number;
  isCompleted: boolean;
}

export default function WalletCardNew({
  points,
  isCompleted,
}: WalletCardProps) {
  return (
    <div
      className={cn(
        `relative max-sm:w-full border border-primary-border rounded-lg flex flex-col justify-center gap-y-[60px] max-sm:gap-y-[30px] items-center w-[320px] backdrop-blur-2xl ${
          isCompleted
            ? "bg-[#D8E6FF] px-5 py-[80px] max-h-[434px] max-sm:px-4 max-sm:py-14"
            : "bg-primary-foreground px-5 pt-[80px] pb-10 max-sm:pt-14 max-sm:px-4 max-sm:pb-4"
        }`
      )}
    >
      {isCompleted && (
        <Image
          src={TickIcon}
          alt="tick"
          className="absolute right-5 top-5 w-12 h-12 max-sm:w-8 max-sm:h-8 text-primary"
        />
      )}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center font-neuebit text-primary text-[100px] leading-[70px] max-sm:text-[64px] max-sm:leading-[50px]">
          + {points}
        </h1>
        <h1 className="text-center text-primary max-sm:text-sm">gem points</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full">
        <Image
          src={WalletIcon}
          alt="wallet"
          className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px]"
        />
        <p className="text-center text-primary mt-5 max-sm:text-sm">
          Connect ETH wallet
        </p>
        <p className="text-center text-[#5B98FF] max-sm:text-sm">
          Must have at least 0.1 ETH
        </p>
      </div>
      {!isCompleted && <ConnectWallet />}
    </div>
  );
}
