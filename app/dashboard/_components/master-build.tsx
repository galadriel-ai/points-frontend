import Link from "next/link";

import { masterBuildData } from "@/app/dashboard/_components/data";
import { Button } from "@/components/ui/button";

import MasterBuildCard from "./master-build-card";

export default function MasterBuild() {
  return (
    <div className="flex flex-col gap-5 md:gap-10 lg:gap-20">
      <div className="flex flex-col gap-5 md:gap-8 lg:gap-10">
        <h2 className="font-mondwest text-2xl leading-[25.92px] lg:text-[40px] lg:leading-[43.19px] text-primary-foreground max-w-[700px]">
          Master- build, create and vibe
        </h2>
        <p className="text-primary-foreground text-sm leading-[1.2] max-sm:font-medium md:text-base lg:text-2xl max-w-[680px]">
          Become a Master Galadrian. Build, create & vibe to collect more points
          on Galadriel Discord.
        </p>
        <div className="flex flex-wrap items-start gap-2.5 md:gap-5 lg:gap-10">
          {masterBuildData.map((master, index) => (
            <MasterBuildCard key={index} master={master} />
          ))}
        </div>
      </div>
      <Button
        className="font-neuebit h-auto w-fit max-sm:w-full px-10 bg-primary-foreground text-primary hover:bg-primary-hover rounded-none text-4xl max-md:text-3xl max-sm:text-2xl font-medium shadow-md"
        asChild
      >
        <Link target="_blank" href={process.env.NEXT_PUBLIC_BECOME_MASTER_URL!}>
          Become a master
        </Link>
      </Button>
    </div>
  );
}
