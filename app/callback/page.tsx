"use client";

import {
  Suspense,
  useEffect,
} from 'react';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { toast } from 'sonner';

const Callback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error && typeof error === "string" && error.length > 0) {
      if (error === "no_access") {
        toast.error("Sorry! You're not on the Whitelist.");
      } else {
        toast.error(`Error: ${error}`);
      }
      router.push("/");
    } else if (token && typeof token === "string") {
      try {
        // Decode the token to get the expiration time
        const decodedToken = jwtDecode<{ exp: number }>(token);
        const expirationDate = new Date(decodedToken.exp * 1000); // Convert exp from seconds to milliseconds
        const now = new Date();
        const expiresInDays = Math.ceil(
          (expirationDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
        );

        // Set the token in a secure cookie
        Cookies.set("authToken", token, {
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          expires: expiresInDays,
        });

        // Wait for 5 seconds before redirecting
        setTimeout(() => {
          router.push("/dashboard/quests");
        }, 5000);
      } catch (error) {
        router.push("/");
        console.error("Invalid token format", error);
        toast.error("Invalid token format");
      }
    } else {
      router.push("/");
      console.error("Token is missing or invalid");
      toast.error("Token is missing or invalid");
    }
  }, [searchParams, router]);

  return (
    <div className="h-[calc(100dvh-112px)] w-full bg-transparent">
      <div className="px-36 max-xl:px-28 max-lg:px-20 max-sm:px-5 max-md:px-16 max-sm:mt-8">
        <h2 className="text-[80px] font-mondwest text-primary-foreground max-lg:text-7xl max-md:text-6xl max-sm:text-[40px]">
          gm <span className="animate-pulse">&lt;X handle&gt;</span>
        </h2>
        <div className="flex justify-center items-start gap-10 mt-5 lg:mt-10 max-md:flex-col">
          <p className="w-[50%] max-md:w-full text-left text-2xl max-lg:text-xl max-md:text-lg max-sm:text-base max-sm:font-medium text-primary-foreground">
            As a fellow Galadrian, you’re joining the mission to build a safe,
            user-owned AI.
          </p>
          <div className="w-[50%] max-md:w-full flex flex-col justify-center items-end max-md:items-start">
            <p className="text-xl max-lg:text-lg max-md:text-base max-sm:text-sm max-sm:font-medium text-primary-foreground">
              Your gem points:
            </p>
            <div className="text-primary-hover font-neuebit text-[330px] leading-[300px] max-lg:text-[300px] max-lg:leading-[270px] max-md:text-[270px] max-md:leading-[240px] max-sm:text-[200px] max-sm:leading-[200px] flex items-center justify-center">
              <span className="animate-pulse text-[#2E91D7]">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CallbackPage = () => {
  return (
    <div className="grow flex flex-col justify-center items-center text-primary-foreground">
      <Suspense fallback={<div>Loading...</div>}>
        <Callback />
      </Suspense>
    </div>
  );
};

export default CallbackPage;
