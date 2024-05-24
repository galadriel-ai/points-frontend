"use client";

import { useEffect, useState } from "react";

import { ConnectKitButton } from "connectkit";
import Cookies from "js-cookie";
import { toast } from "sonner";
import useSWR from "swr";
import { getAddress } from "viem";
import { useAccount, useConnect, useDisconnect, useSignMessage } from "wagmi";

import { Button } from "@/components/ui/button";

const fetchNonceAndIssuedAt = async (url: string, walletAddress: string) => {
  const token = Cookies.get("authToken");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify({ wallet_address: walletAddress }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

const linkWallet = async (
  url: string,
  walletAddress: string,
  signature: string
) => {
  const token = Cookies.get("authToken");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token || "",
    },
    body: JSON.stringify({
      wallet_address: walletAddress,
      signature: signature,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

export default function ConnectWallet() {
  const [siweMessage, setSiweMessage] = useState<string | null>(null);
  const [linkSuccess, setLinkSuccess] = useState<boolean>(false);
  const { address: accountAddress, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const {
    data: signMessageData,
    error: signError,
    signMessage,
  } = useSignMessage();

  const {
    data: nonceData,
    error: nonceError,
    mutate: fetchNonce,
  } = useSWR(
    accountAddress
      ? [
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/eth/nonce`,
          accountAddress,
        ]
      : null,
    ([url, walletAddress]) => fetchNonceAndIssuedAt(url, walletAddress)
  );

  useEffect(() => {
    if (nonceData && accountAddress) {
      const checksumAddress = getAddress(accountAddress);
      setSiweMessage(
        `${process.env.NEXT_PUBLIC_WEBSITE_DOMAIN} wants you to sign in with your Ethereum account:\n${checksumAddress}\n\n\nURI: ${process.env.NEXT_PUBLIC_API_BASE_URL}\nVersion: 1\nChain ID: 1\nNonce: ${nonceData.nonce}\nIssued At: ${nonceData.issued_at}`
      );
    }
  }, [nonceData, accountAddress]);

  useEffect(() => {
    if (siweMessage && !linkSuccess) {
      signMessage({ message: siweMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siweMessage, linkSuccess]);

  useEffect(() => {
    if (signMessageData && accountAddress && !linkSuccess) {
      const checksumAddress = getAddress(accountAddress);
      linkWallet(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/eth/link`,
        checksumAddress,
        signMessageData
      )
        .then(() => {
          setLinkSuccess(true);
          toast.success("Wallet linked successfully!");
          disconnect(); // Disconnect the wallet after successful link.
        })
        .catch((error) => {
          toast.error(`Link wallet error: ${error.message}`);
          console.error("Link wallet error:", error);
        });
    }
  }, [signMessageData, accountAddress, disconnect, linkSuccess]);

  useEffect(() => {
    if (isConnected && accountAddress) {
      fetchNonce();
    }
  }, [isConnected, accountAddress, fetchNonce]);

  useEffect(() => {
    if (signError) {
      toast.error("Sign message was cancelled.");
      disconnect(); // Disconnect the wallet on sign message cancellation
    }
  }, [signError, disconnect]);

  return (
    <ConnectKitButton.Custom>
      {({
        isConnected,
        isConnecting,
        show,
        hide,
        truncatedAddress,
        address,
        ensName,
        chain,
      }) => {
        return (
          <Button
            onClick={show}
            className="max-sm:text-2xl w-[85%] max-sm:w-full py-8 max-sm:py-6 rounded-none text-[40px] font-neuebit hover:bg-primary-hover hover:text-primary"
          >
            {isConnected ? truncatedAddress : "Connect"}
          </Button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
