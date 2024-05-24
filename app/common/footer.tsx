import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="z-20 flex w-full justify-center items-center bg-[#2B2B2B]">
      <div className="relative flex w-full max-w-[120rem] min-w-[20rem] justify-between max-[950px]:flex-row-reverse max-[950px]:items-end items-center bg-[#2B2B2B] px-36 max-xl:px-28 max-lg:px-20 max-sm:px-5 max-md:px-16 py-16 max-md:py-10 text-primary-foreground">
        <p className="text-primary-foreground/70 max-sm:text-sm">
          Galadriel 2024
        </p>
        <ul className="flex justify-center items-center gap-x-4 max-[950px]:flex-col gap-y-4 max-[950px]:items-start">
          <li>
            <Button
              variant="link"
              className="text-base text-primary-foreground p-2"
              asChild
            >
              <Link target="_blank" href={process.env.NEXT_PUBLIC_X_COM_URL!}>
                X.com
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="text-base text-primary-foreground p-2"
              asChild
            >
              <Link target="_blank" href={process.env.NEXT_PUBLIC_DISCORD_URL!}>
                Discord
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="text-base text-primary-foreground p-2"
              asChild
            >
              <Link target="_blank" href={process.env.NEXT_PUBLIC_DOCS_URL!}>
                Docs
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="text-base text-primary-foreground p-2"
              asChild
            >
              <Link
                target="_blank"
                href={process.env.NEXT_PUBLIC_EXPLORER_URL!}
              >
                Explorer
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="text-base text-primary-foreground p-2"
              asChild
            >
              <Link target="_blank" href={process.env.NEXT_PUBLIC_TEEML_URL!}>
                teeML
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="text-base text-primary-foreground p-2"
              asChild
            >
              <Link target="_blank" href={process.env.NEXT_PUBLIC_BLOG_URL!}>
                Blog
              </Link>
            </Button>
          </li>
          <li>
            <Button
              variant="link"
              className="text-base text-primary-foreground p-2"
              asChild
            >
              <Link
                target="_blank"
                href={process.env.NEXT_PUBLIC_LITEPAPER_URL!}
              >
                Litepaper
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </footer>
  );
}
