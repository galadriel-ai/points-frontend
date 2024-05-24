import { getDefaultConfig } from 'connectkit';
import { createConfig } from 'wagmi';
import {
  arbitrum,
  mainnet,
  optimism,
  polygon,
} from 'wagmi/chains';

export const config = createConfig(
  getDefaultConfig({
    appName: "Galadriel",
    chains: [mainnet, polygon, optimism, arbitrum],
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
    // Optional App Info
    appDescription: "The first L1 blockchain for AI",
    appUrl: process.env.NEXT_PUBLIC_WEBSITE_URL, // your app's url
    appIcon: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/logo.png`, // your app's icon, no bigger than 1024x1024px
  })
);

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
