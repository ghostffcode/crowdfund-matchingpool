import { ethers } from "ethers";
import { useEffect } from "react";
import {
  Address,
  useContractWrite,
  useQuery,
  useWaitForTransaction,
} from "wagmi";
import { pool } from "~/data/mock";
import { useContractConfig } from "./useContractConfig";

const abi = [] as const;
const useContractRead = (props: any) => ({
  data: pool,
  isLoading: false,
});

export function usePoolConfig({ address = "" }) {
  return useContractRead({
    address,
    abi,
    functionName: "config",
    enabled: Boolean(address),
  });
}

export function useDonate(address: Address, onSuccess: () => void) {
  const { abi } = useContractConfig("Crowdfund");

  const donate = useContractWrite({
    address,
    abi,
    functionName: "donate",
    mode: "recklesslyUnprepared",
  });

  const hash = donate.data?.hash;
  const tx = useWaitForTransaction({ hash, enabled: Boolean(hash) });

  useEffect(() => {
    const logs = tx.data?.logs || [];
    const log = logs[logs.length - 1];
    if (log) {
      const iface = new ethers.utils.Interface(abi);
      const event = iface.parseLog(log);
      console.log(event);
      onSuccess();
    }
  }, [tx.data]);
  return {
    ...donate,
    isLoading: donate.isLoading || tx.isLoading,
  };
}
