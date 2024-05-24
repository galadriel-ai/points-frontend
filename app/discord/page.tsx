"use client";

import { Suspense, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const Callback = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");
    const isMember = searchParams.get("is_member");

    if (success === "True") {
      if (isMember === "True") {
        toast.success("Connected to Discord successfully!");
      } else {
        toast.info("You are not a member of the Discord.");
      }
    } else {
      toast.error("Failed to connect to Discord.");
    }
  }, [searchParams]);

  return <div className="h-[calc(100dvh-112px)] w-full bg-transparent"></div>;
};

const DiscordPage = () => {
  return (
    <div className="grow flex flex-col justify-center items-center text-primary-foreground">
      <Suspense fallback={<div>Loading...</div>}>
        <Callback />
      </Suspense>
    </div>
  );
};

export default DiscordPage;
