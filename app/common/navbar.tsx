"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { truncateAddress } from "@/lib/utils";
import GaladrielLogo from "@/public/assets/galadriel-logo.png";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export default function DesktopNav() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/dashboard/user`
  );

  useEffect(() => {
    const token = Cookies.get("authToken");
    setAuthToken(token || null);

    if (token) {
      if (!pathname.includes("/dashboard/")) {
        router.push("/dashboard/quests");
      }
    } else {
      if (pathname.includes("/dashboard")) {
        router.push("/");
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    Cookies.remove("authToken");
    setAuthToken(null);
    router.push("/");
  };

  return (
    <div className="flex max-w-[120rem] min-w-[20rem] justify-between items-center w-full py-8 px-36 max-xl:px-28 max-lg:px-20 max-sm:px-5 max-md:px-16 bg-transparent">
      <Link
        href="https://galadriel.com/"
        className="font-neuebit text-primary-foreground font-medium text-5xl max-sm:text-4xl"
      >
        <Image src={GaladrielLogo} alt="Galadriel Logo" className="w-32" />
      </Link>
      <ul className="max-md:hidden flex justify-end items-center gap-12 text-primary-foreground text-lg font-medium">
        <li>
          <Button
            variant="link"
            className="text-lg text-primary-foreground p-2 font-medium"
            asChild
          >
            <Link href="https://galadriel.com/">Home</Link>
          </Button>
        </li>
        <li>
          <Button
            variant="link"
            className="text-lg text-primary-foreground p-2 font-medium"
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
            className="text-lg text-primary-foreground p-2 font-medium"
            asChild
          >
            <Link target="_blank" href={process.env.NEXT_PUBLIC_FAUCET_URL!}>
              Faucet
            </Link>
          </Button>
        </li>
        {authToken ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <li className="p-2 group flex justify-center items-center gap-x-4 cursor-pointer">
                Profile <ChevronDownIcon />
              </li>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-[#054EC94D] rounded-lg border border-[#0D5FEA] shadow-sm p-5 ml-20 backdrop-blur-3xl">
              {isLoading ? (
                <>
                  <p className="text-primary-foreground font-medium animate-pulse">
                    X: &lt;X handle&gt;
                  </p>
                  <p className="text-primary-foreground font-medium mt-2 animate-pulse">
                    EVM: 0x2138..
                  </p>
                </>
              ) : error ? (
                <>
                  <p className="text-primary-foreground font-medium">
                    X: Error
                  </p>
                  <p className="text-primary-foreground font-medium mt-2">
                    EVM: Error
                  </p>
                </>
              ) : (
                <>
                  <p className="text-primary-foreground font-medium">
                    X: {data?.x_username || "No username"}
                  </p>
                  <p className="text-primary-foreground font-medium mt-2">
                    EVM:{" "}
                    {truncateAddress(data?.wallet_address) || "Not Connected"}
                  </p>
                </>
              )}
              <Button
                variant="link"
                className="text-primary-foreground px-0 underline mt-6 font-medium text-base"
                onClick={handleLogout}
              >
                Log out
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <li>
            <Button
              variant="outline"
              size="sm"
              className="text-lg text-primary-foreground py-0.5 px-3 font-medium"
              asChild
            >
              <Link
                target="_blank"
                href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/x/login`}
              >
                Log in with X
              </Link>
            </Button>
          </li>
        )}
      </ul>
      <Drawer direction="top">
        <DrawerTrigger asChild>
          <div className="w-[22px] max-md:flex flex-col gap-y-1 items-end p-2 box-content hidden cursor-pointer">
            <div className="w-full h-[4px] bg-primary-foreground"></div>
            <div className="w-full h-[4px] bg-primary-foreground"></div>
            <div className="w-full h-[4px] bg-primary-foreground"></div>
          </div>
        </DrawerTrigger>
        <DrawerContent className="w-full h-full flex flex-col justify-center py-10 transform-gpu focus:outline-none backdrop-blur-2xl bg-transparent border-none">
          <div className="w-full h-full flex flex-col items-start p-10 pt-32 justify-start">
            <ul className="text-xl font-medium text-primary-foreground flex flex-col items-start gap-y-7">
              <li>
                <Button
                  variant="link"
                  className="text-lg text-primary-foreground p-2 font-medium"
                  asChild
                >
                  <Link href="https://galadriel.com/">Home</Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-lg text-primary-foreground p-2 font-medium"
                  asChild
                >
                  <Link
                    target="_blank"
                    href={process.env.NEXT_PUBLIC_DOCS_URL!}
                  >
                    Docs
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="link"
                  className="text-lg text-primary-foreground p-2 font-medium"
                  asChild
                >
                  <Link
                    target="_blank"
                    href={process.env.NEXT_PUBLIC_FAUCET_URL!}
                  >
                    Faucet
                  </Link>
                </Button>
              </li>
              {authToken ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <li className="p-2 group flex justify-center items-center gap-x-4 cursor-pointer">
                      Profile <ChevronDownIcon />
                    </li>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-transparent border-none shadow-none p-5 ml-20">
                    {isLoading ? (
                      <>
                        <p className="text-primary-foreground font-medium animate-pulse">
                          X: &lt;X handle&gt;
                        </p>
                        <p className="text-primary-foreground font-medium mt-2 animate-pulse">
                          EVM: 0x2138..
                        </p>
                      </>
                    ) : error ? (
                      <>
                        <p className="text-primary-foreground font-medium">
                          X: Error
                        </p>
                        <p className="text-primary-foreground font-medium mt-2">
                          EVM: Error
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-primary-foreground font-medium">
                          X: {data?.x_username || "No username"}
                        </p>
                        <p className="text-primary-foreground font-medium mt-2">
                          EVM:{" "}
                          {truncateAddress(data?.wallet_address) ||
                            "Not Connected"}
                        </p>
                      </>
                    )}
                    <Button
                      variant="link"
                      className="text-primary-foreground px-0 underline mt-6 font-medium text-base"
                      onClick={handleLogout}
                    >
                      Log out
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <li>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-lg text-primary-foreground py-0.5 px-3 font-medium"
                    asChild
                  >
                    <Link
                      target="_blank"
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/x/login`}
                    >
                      Log in with X
                    </Link>
                  </Button>
                </li>
              )}
            </ul>
          </div>
          <DrawerHandle className="h-1 w-96 rounded-full shadow-md bg-primary-foreground" />
        </DrawerContent>
      </Drawer>
    </div>
  );
}
