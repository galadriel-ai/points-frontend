import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TickIcon from "@/public/assets/quests/tick.svg";

import { QuestData } from "./data";

interface QuestsCardProps {
  quest: QuestData;
  className?: string;
}

const QuestsCard: React.FC<QuestsCardProps> = ({ quest, className }) => {
  const {
    xp,
    title,
    icon: IconComponent,
    description,
    tip = "",
    isCompleted = false,
    link = "",
  } = quest;

  return (
    <div
      className={cn(
        `relative w-[320px] max-h-[434px] max-sm:w-full border border-primary-border rounded-lg px-5 py-[80px] max-sm:pt-14 max-sm:px-4 max-sm:pb-4 flex flex-col justify-center gap-y-[60px] max-sm:gap-y-[30px] items-center backdrop-blur-2xl
      ${
        isCompleted
          ? "bg-[#5B98FF]/30 max-sm:py-14"
          : "bg-[#054EC9]/30 max-sm:pb-4 max-sm:pt-14"
      }`,
        className
      )}
    >
      {isCompleted && (
        <Image
          src={TickIcon}
          alt="tick"
          className="absolute top-5 right-5 w-12 h-12 max-sm:w-8 max-sm:h-8"
        />
      )}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center font-neuebit text-primary-hover text-[100px] max-sm:text-[64px] leading-[70px] max-sm:leading-[50px]">
          + {xp}
        </h1>
        <h1 className="text-center text-primary-foreground max-sm:text-sm">
          {title}
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-auto max-sm:mt-0">
        <Image
          src={IconComponent}
          alt={title}
          className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px]"
        />
        <p className="overflow-y-auto text-center text-primary-foreground mt-5 max-sm:mt-3 max-sm:text-sm">
          {description}
        </p>
      </div>
      {!isCompleted && (
        <>
          <Button
            className="rounded-none font-neuebit hidden w-full py-8 max-sm:py-6 max-sm:flex justify-center items-center bg-primary-foreground text-2xl text-primary hover:bg-primary-hover"
            asChild
          >
            <Link target="_blank" href={link || ""}>
              {tip}
            </Link>
          </Button>
          <div className="group max-sm:hidden absolute z-10 right-0 -bottom-5">
            <Button
              className="max-sm:hidden max-sm:text-sm text-base relative z-10 px-5 py-6 rounded-none bg-primary-foreground text-primary hover:bg-primary-foreground hover:text-primary font-medium hover:translate-y-2 transform-gpu will-change-transform transition-transform"
              asChild
            >
              <Link target="_blank" href={link || ""}>
                <svg
                  width="28"
                  height="15"
                  viewBox="0 0 28 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <path
                    d="M8.42767 0L27.0772 14.995L0.922791 14.9951L8.42767 0Z"
                    fill="#F8F8F8"
                  />
                </svg>
                {tip}
              </Link>
            </Button>
            <Button
              className="max-sm:text-sm text-base absolute z-0 -right-3 -bottom-3 px-5 py-6 rounded-none bg-[#14368F] text-[#14368F] font-medium opacity-0 group-hover:opacity-100 group-hover:translate-y-2 group-hover:transition-all pointer-events-none"
              asChild
            >
              <Link target="_blank" href={link || ""}>
                {tip}
              </Link>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestsCard;
