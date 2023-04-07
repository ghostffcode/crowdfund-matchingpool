import { ethers } from "ethers";
import { useQuery } from "wagmi";
import { pool } from "~/data/mock";

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
