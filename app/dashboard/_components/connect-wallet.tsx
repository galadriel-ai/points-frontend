"use client";

import { useEffect, useState } from "react";

import { ConnectKitButton } from "connectkit";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { getAddress } from "viem";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

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

  return response;
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

  return response;
};

export default function ConnectWallet() {
  const [linkSuccess, setLinkSuccess] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const { address: accountAddress, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const {
    signMessage,
    data: signMessageData,
    error: signError,
  } = useSignMessage();

  useEffect(() => {
    const connectWalletFlow = async () => {
      setIsRunning(true);
      if (isConnected && accountAddress) {
        const checksumAddress = getAddress(accountAddress);

        await fetchNonceAndIssuedAt(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/eth/nonce`,
          checksumAddress
        ).then((response) => {
          if (response.ok) {
            response
              .json()
              .then((nonceData: { nonce: string; issued_at: string }) => {
                // Set SIWE message
                const message = `galadriel.com wants you to sign in with your Ethereum account:\n${checksumAddress}\n\n\nURI: ${process.env.NEXT_PUBLIC_API_BASE_URL}\nVersion: 1\nChain ID: 1\nNonce: ${nonceData.nonce}\nIssued At: ${nonceData.issued_at}`;
                // Sign message
                signMessage(
                  { message },
                  {
                    onSuccess(data, variables, context) {
                      // Link wallet
                      linkWallet(
                        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/eth/link`,
                        checksumAddress,
                        data
                      )
                        .then((res) => {
                          if (res.ok) {
                            res.json().then((data: { success: boolean }) => {
                              setLinkSuccess(data.success);
                              toast.success(
                                `Wallet linked ${
                                  data.success ? "successfully" : "failed"
                                }!`
                              );
                            });
                          } else {
                            if (res.status === 403) {
                              toast.error("Not Enough Funds!");
                            } else {
                              toast.error(`HTTP error! Status: ${res.status}`);
                            }
                          }
                        })
                        .finally(() => {
                          disconnect();
                          setIsRunning(false);
                        });
                    },
                  }
                );
              });
          } else {
            if (response.status === 422) {
              toast.error("Wallet Address is Incorrect");
            } else {
              toast.error(`HTTP error! Status: ${response.status}`);
            }
            console.error(`HTTP error! Status: ${response.status}`);
            disconnect();
            setIsRunning(false);
          }
        });
      }
    };

    if (isConnected && accountAddress && !isRunning && !linkSuccess) {
      connectWalletFlow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, accountAddress]);

  useEffect(() => {
    if (signError) {
      toast.error("Sign message was cancelled.");
      disconnect(); // Disconnect the wallet on sign message cancellation
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signError]);

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
