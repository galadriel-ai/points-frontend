import { Skeleton } from "@/components/ui/skeleton";

const QuestCardSkeleton = () => {
  return (
    <div className="relative max-sm:w-full border border-primary-border rounded-lg px-[30px] py-[70px] max-sm:pt-10 max-sm:px-5 max-sm:pb-5 flex flex-col max-sm:justify-between items-center w-[320px] h-[450px] backdrop-blur-2xl bg-[#054EC9]/30 max-sm:h-[330px]">
      <Skeleton className="absolute top-5 right-5 w-8 h-8 bg-[#2E91D7]" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-center font-neuebit text-primary-hover text-[100px] max-sm:text-[64px] leading-[70px] animate-pulse text-[#2E91D7]">
          + 00
        </h1>
        <h1 className="text-center text-primary-foreground max-sm:text-sm animate-pulse text-[#2E91D7]">
          gem points
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center mt-auto max-sm:mt-0">
        <Skeleton className="w-[50px] h-[50px] max-sm:w-[30px] max-sm:h-[30px] bg-[#2E91D7]" />
        <Skeleton className="h-20 max-sm:h-10 overflow-y-auto text-center text-primary-foreground mt-5 max-sm:mt-3 max-sm:text-sm animate-pulse text-[#2E91D7]">
          description
        </Skeleton>
      </div>
    </div>
  );
};

export default QuestCardSkeleton;
