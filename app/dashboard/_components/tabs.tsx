import Link from "next/link";

import { Button } from "@/components/ui/button";

interface TabsProps {
  activeTab: "quests" | "run-a-node" | "leaderboard";
  disabledTab?: "quests" | "run-a-node" | "leaderboard";
  className?: string;
}

function Tabs({ activeTab, disabledTab }: TabsProps) {
  const tabs = [
    {
      name: "quests",
      label: "Quests",
      href: "/dashboard/quests",
      roundedClass: "md:rounded-l-md",
    },
    {
      name: "run-a-node",
      label: "Run a node",
      href: "/dashboard/run-a-node",
      roundedClass: "rounded-none",
    },
    {
      name: "leaderboard",
      label: "Leaderboard",
      href: "/dashboard/leaderboard",
      roundedClass: "md:rounded-r-md",
    },
  ];

  return (
    <div className="px-36 max-lg:px-20 max-sm:px-0 max-md:px-16">
      <div className="mt-16 lg:mt-24 mx-auto flex border border-primary-border md:rounded-lg">
        {tabs.map((tab, index) => {
          const isActive = tab.name === activeTab;
          const isDisabled = tab.name === disabledTab;

          return (
            <Button
              key={tab.name}
              variant="ghost"
              className={`relative group w-1/3 py-8 font-neuebit text-4xl max-md:text-3xl max-sm:text-2xl rounded-none ${
                isActive
                  ? "bg-primary-foreground text-primary hover:text-primary"
                  : "bg-transparent text-primary-foreground hover:text-primary-hover hover:bg-primary"
              } ${tab.roundedClass}
              ${isDisabled ? "cursor-default" : ""}
              `}
              // disabled={isDisabled}`
              asChild={!isDisabled}
            >
              {!isDisabled ? (
                <Link href={tab.href}>
                  {tab.label}
                  {index === 0 && (
                    <span
                      className={`w-px h-3/5 absolute right-0 ${
                        isActive ? "bg-primary-foreground" : "bg-primary-border"
                      }`}
                    />
                  )}
                  {index === 2 && (
                    <span
                      className={`w-px h-3/5 absolute left-0 ${
                        isActive ? "bg-primary-foreground" : "bg-primary-border"
                      }`}
                    />
                  )}
                </Link>
              ) : (
                <p className="relative opacity-50">
                  <span className="p-5 hidden group-hover:block absolute z-10 bg-[#003795] font-mono text-base max-md:text-sm max-sm:text-xs text-primary-foreground -top-16 left-1/2 -translate-x-1/2 -translate-y-2 md:-translate-y-4">
                    <svg
                      width="28"
                      height="15"
                      viewBox="0 0 28 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute -bottom-7 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <path
                        d="M8.42767 14.9951L27.0772 7.9155e-05L0.922791 5.72205e-05L8.42767 14.9951Z"
                        fill="#003795"
                      />
                    </svg>
                    Coming soon
                  </span>
                  <span className="group-hover:text-primary-foreground text-primary-foreground">
                    {tab.label}
                  </span>
                </p>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export default Tabs;
