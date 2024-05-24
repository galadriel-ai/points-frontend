"use client";

import { Suspense, useEffect } from "react";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter, useSearchParams } from "next/navigation";

const Callback = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token && typeof token === "string") {
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

        // Redirect to the desired page after setting the cookie
        router.push("/dashboard/quests");
      } catch (error) {
        console.error("Invalid token format", error);
      }
    } else {
      console.error("Token is missing or invalid");
    }
  }, [searchParams, router]);

  return <div className="h-[calc(100dvh-112px)] w-full bg-transparent"></div>;
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
