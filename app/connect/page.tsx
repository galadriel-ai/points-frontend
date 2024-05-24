"use client";

import {
  useEffect,
  useState,
} from 'react';

import { ConnectKitButton } from 'connectkit';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import { getAddress } from 'viem';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSignMessage,
} from 'wagmi';

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

  console.log("nonce", response.body);

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

export default function Connect() {
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

  const DOMAIN = "galadriel.com";
  const BASE_URL = "https://api.points.galadriel.com";

  useEffect(() => {
    if (nonceData && accountAddress) {
      const checksumAddress = getAddress(accountAddress);
      console.log("Checksum Add:(SIWE MSG)", checksumAddress);
      setSiweMessage(
        `${DOMAIN} wants you to sign in with your Ethereum account:\n${checksumAddress}\n\n\nURI: ${BASE_URL}\nVersion: 1\nChain ID: 1\nNonce: ${nonceData.nonce}\nIssued At: ${nonceData.issued_at}`
      );
    }
  }, [nonceData, accountAddress]);

  useEffect(() => {
    if (signMessageData && accountAddress) {
      const checksumAddress = getAddress(accountAddress);
      console.log("Checksum Add:(Link Wallet)", checksumAddress);

      linkWallet(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/eth/link`,
        checksumAddress,
        signMessageData
      )
        .then((res) => {
          setLinkSuccess(true);
          console.log("Link Status", res);
        })
        .catch((error) => console.error("Link wallet error:", error));
    }
  }, [signMessageData, accountAddress]);

  return (
    <div className="grow flex flex-col justify-center items-center text-primary-foreground">
      <div>
        <h2>Account</h2>
        <ConnectKitButton.Custom>
          {({
            isConnected,
            isConnecting,
            show,
            hide,
            address,
            ensName,
            chain,
          }) => {
            return (
              <button onClick={show} className="bg-white p-4 text-black">
                {isConnected ? address : "Custom Connect"}
              </button>
            );
          }}
        </ConnectKitButton.Custom>

        <div>
          status: {isConnected ? "Connected" : "Disconnected"}
          <br />
          address: {accountAddress}
        </div>

        {isConnected && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <button
                className="bg-white p-4 text-black"
                type="button"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
              {!nonceData && !nonceError && (
                <button
                  className="bg-white p-4 text-black"
                  onClick={() => fetchNonce()}
                >
                  Get Nonce
                </button>
              )}
              {nonceError && (
                <div>Error fetching nonce: {nonceError.message}</div>
              )}
              {siweMessage && (
                <button
                  type="button"
                  className="bg-white p-4 text-black"
                  onClick={() => {
                    signMessage({ message: siweMessage });
                    console.log("SIWE", siweMessage);
                  }}
                >
                  Sign Message
                </button>
              )}
              {signError && <div>Error: {signError.message}</div>}
              {linkSuccess && (
                <div className="text-green-500">
                  Wallet linked successfully!
                </div>
              )}
            </div>
            {signMessageData && (
              <div>
                <div>Signature: {signMessageData}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
