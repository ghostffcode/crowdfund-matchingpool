import { useContractWrite } from "wagmi";
import { useContractConfig } from "./useContractConfig";

export function useCrowdfundCreate() {
  const CrowdfundFactory = useContractConfig("CrowdfundFactory");

  return useContractWrite({
    ...CrowdfundFactory,
    mode: "recklesslyUnprepared",
    functionName: "createCrowdfund",
  });
}
