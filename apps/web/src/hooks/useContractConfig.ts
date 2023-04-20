import { Address, useNetwork } from "wagmi";

import ContractConfig from "../../contracts/hardhat_contracts.json";

type ReturnType = { abi: string[]; address: Address };

type ContractTypes = keyof (typeof ContractConfig)[5][0]["contracts"];

export const useContractConfig = (name: ContractTypes) => {
  const { chain } = useNetwork();

  if (!chain?.id) return { address: "", abi: [] };

  const { abi = [], address = "" } =
    // @ts-ignore
    ContractConfig[chain?.id]?.[0]?.contracts?.[name];

  return { abi, address };
};
