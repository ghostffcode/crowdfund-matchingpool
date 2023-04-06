import { Wallet } from "ethers";
import { burnerWalletId } from "./connector";

export const saveWallet = (key: string) => {
  try {
    localStorage.setItem(burnerWalletId, key);
  } catch (error) {
    console.log("Error saving wallet key", error);
  }
};
export const loadWallet = () => {
  let key;
  try {
    key =
      localStorage.getItem(burnerWalletId) || Wallet.createRandom().privateKey;
  } catch (error) {
    console.log("Error loading mnemonic", error);
  }
  key && saveWallet(key);
  return key as string;
};
