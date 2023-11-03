import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  connectorsForWallets,
  darkTheme,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, mainnet, WagmiConfig } from "wagmi";
import { polygon, goerli, hardhat } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { burnerWalletConfig } from "~/providers/burner-wallet/config";
import { PropsWithChildren } from "react";

const availableChains =
  process.env.NODE_ENV === "production"
    ? [mainnet, polygon]
    : [mainnet, polygon, goerli, hardhat];
const { chains, provider } = configureChains(availableChains as any, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
  publicProvider(),
]);

const connectors = connectorsForWallets([
  {
    groupName: "App",
    wallets: [
      metaMaskWallet({ chains, shimDisconnect: true }),
      // burnerWalletConfig({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const queryClient = new QueryClient();

export const WalletProvider = ({ children }: PropsWithChildren) => (
  <WagmiConfig client={wagmiClient}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
        chains={chains}
        theme={lightTheme({
          accentColor: "#000000",
          accentColorForeground: "#FFFFFF",
          borderRadius: "medium",
          overlayBlur: "small",
        })}
      >
        {children}
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiConfig>
);
