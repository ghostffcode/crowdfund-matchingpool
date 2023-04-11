import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  connectorsForWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { burnerWalletConfig } from "~/providers/burner-wallet/config";
import { PropsWithChildren } from "react";

const { chains, provider } = configureChains(
  [polygon],
  [
    alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID as string }),
    publicProvider(),
  ]
);

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
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </QueryClientProvider>
  </WagmiConfig>
);
