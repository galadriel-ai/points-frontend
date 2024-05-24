import Image from "next/image";

import { cn } from "@/lib/utils";

import { MasterBuildData } from "./data";

interface QuestsCardProps {
  master: MasterBuildData;
  className?: string;
}

const MasterBuild: React.FC<QuestsCardProps> = ({ master, className }) => {
  const { xp, isXpFixed, title, icon: IconComponent, description } = master;

  return (
    <div
      className={cn(
        "relative w-[320px] max-sm:w-full border border-primary-border rounded-lg px-5 py-[80px] max-sm:py-14 max-sm:px-4 flex flex-col justify-center gap-y-[60px] max-sm:gap-y-[30px] items-center backdrop-blur-2xl",
        className
      )}
    >
      <div className="flex flex-col items-center justify-center">
        {isXpFixed ? (
          <span className="text-center font-neuebit text-primary-hover text-[100px] max-sm:text-[64px] leading-[70px] max-sm:leading-[50px]">
            + {xp}
          </span>
        ) : (
          <div className="flex gap-x-3 items-end">
            <span className="text-primary-hover font-neuebit text-4xl max-sm:text-2xl">
              up to
            </span>
            <span className="text-center font-neuebit text-primary-hover text-[100px] max-sm:text-[64px] leading-[70px] max-sm:leading-[50px]">
              {xp}
            </span>
          </div>
        )}
        <span className="text-center text-primary-foreground max-sm:text-sm">
          {title}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Image
          src={IconComponent}
          alt={title}
          className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px]"
        />
        <p className="overflow-y-auto text-center text-primary-foreground mt-5 max-sm:mt-3 max-sm:text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MasterBuild;
