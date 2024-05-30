import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="w-full h-[calc(100dvh-100px)] sm:h-[calc(100dvh-108px)] xl:h-[calc(100dvh-295px)]">
      {/* main contents */}
      <div className="h-full flex flex-col justify-center gap-y-20">
        {/* Start earning Gem Points today */}
        <div className="flex flex-col justify-center items-center gap-y-2">
          <p className="text-center text-primary-foreground font-medium sm:text-base md:text-lg lg:text-xl">
            Start earning Gem Points today
          </p>
          <svg
            width="66"
            height="45"
            viewBox="0 0 66 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M44.7419 21.6667C43.5329 21.6067 42.4305 21.552 41.4256 21.5091C38.6549 21.3907 34.3819 17.1527 34.0943 14.3944C33.7441 11.0365 33.2658 6.45244 33.253 0.253855C33.2528 0.114312 33.1397 0 33.0001 0C32.8606 0 32.7475 0.114313 32.7472 0.253856C32.7344 6.45238 32.2561 11.0342 31.906 14.3944C31.6183 17.1527 27.3453 21.392 24.5745 21.51C23.5697 21.5528 22.4672 21.6072 21.2583 21.6667C16.3585 21.9089 9.66141 22.2411 0.595446 22.2472C0.455903 22.2473 0.341309 22.3605 0.341309 22.5C0.341309 22.6395 0.455902 22.7527 0.595446 22.7528C9.66137 22.7589 16.3562 23.0911 21.2583 23.3333C22.4673 23.3933 23.5697 23.448 24.5746 23.4909C27.3454 23.6093 31.6183 27.8473 31.906 30.6056C32.2561 33.9635 32.7344 38.5476 32.7472 44.7461C32.7475 44.8857 32.8606 45 33.0001 45C33.1397 45 33.2528 44.8857 33.253 44.7461C33.2658 38.5476 33.7441 33.9658 34.0943 30.6056C34.3819 27.8473 38.6549 23.608 41.4257 23.49C42.4305 23.4472 43.533 23.3928 44.7419 23.3333C49.6417 23.0911 56.3388 22.7589 65.4048 22.7528C65.5443 22.7527 65.6589 22.6395 65.6589 22.5C65.6589 22.3605 65.5443 22.2473 65.4048 22.2472C56.3366 22.2411 49.6417 21.9089 44.7419 21.6667Z"
              fill="#F8F8F8"
            />
          </svg>
        </div>

        {/* Blockchain tagline */}
        <div className="flex flex-col justify-center items-center text-primary-foreground space-y-8">
          <h1 className="text-center font-mondwest text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            The first L1 blockchain for AI
          </h1>
          <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            <span>
              Become part of a mission to enable a safe, user-owned AI.
            </span>{" "}
            <span>
              Participate in the network, join the community & build on-chain
              AI.
            </span>
          </p>
        </div>

        {/* Start earning points button */}
        <Button
          className="font-neuebit mx-auto h-auto w-auto max-md:w-full px-10 bg-primary-foreground text-primary hover:bg-primary-hover rounded-none text-4xl max-sm:2xl max-md:text-3xl font-medium shadow-md"
          asChild
        >
          <Link
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/x/login`}
          >
            Start earning points
          </Link>
        </Button>
      </div>
    </div>
  );
}
