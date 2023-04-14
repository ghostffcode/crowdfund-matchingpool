import { useContractWrite } from "wagmi";
import { SendTransactionResult } from "@wagmi/core";
import { useContractConfig } from "./useContractConfig";
import { ethers } from "ethers";

export function useCrowdfundCreate({
  onSuccess,
}: {
  onSuccess: (data: SendTransactionResult) => void;
}) {
  const CrowdfundFactory = useContractConfig("CrowdfundFactory");
  return {
    ...useContractWrite({
      ...CrowdfundFactory,
      mode: "recklesslyUnprepared",
      functionName: "createCrowdfund",
      onSuccess,
    }),
    iface: new ethers.utils.Interface(CrowdfundFactory.abi),
  };
}
