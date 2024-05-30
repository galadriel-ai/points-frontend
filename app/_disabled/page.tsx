import Link from "next/link";

import { Button } from "@/components/ui/button";

import HeroSection from "./_components/hero-section";
import LeaderboardJoined from "./_components/leaderboard-joined";

export default function Home() {
  return (
    <main className="w-full max-w-[120rem] min-w-[20rem] px-36 max-xl:px-28 max-lg:px-20 max-sm:px-5 max-md:px-16 overflow-y-clip">
      <HeroSection />
      <LeaderboardJoined />
      <div className="my-40 max-sm:my-20 relative z-20 flex flex-col gap-y-16 justify-center items-center">
        <h1 className="text-center text-6xl max-sm:text-[40px] max-md:text-5xl font-mondwest text-primary-foreground">
          Enable safe, user-owned AI
        </h1>
        <Button
          className="font-neuebit h-auto w-auto max-sm:w-full px-10 bg-primary-foreground text-primary hover:bg-primary-hover rounded-none text-4xl max-md:text-3xl max-sm:text-2xl font-medium shadow-md"
          asChild
        >
          <Link
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/x/login`}
          >
            Contribute & earn points
          </Link>
        </Button>
      </div>
    </main>
  );
}
