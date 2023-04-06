import { Chain, Wallet } from "@rainbow-me/rainbowkit";
import {
  BurnerConnector,
  burnerWalletId,
  burnerWalletName,
  defaultBurnerChainId,
} from "./connector";

export interface BurnerWalletOptions {
  chains: Chain[];
}

export const burnerWalletConfig = ({
  chains,
}: BurnerWalletOptions): Wallet => ({
  id: burnerWalletId,
  name: burnerWalletName,
  iconUrl: "",
  iconBackground: "orange",
  createConnector: () => {
    const connector = new BurnerConnector({
      chains,
      options: { defaultChainId: defaultBurnerChainId },
    });

    return { connector };
  },
});
