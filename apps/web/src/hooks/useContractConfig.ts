import { useNetwork } from "wagmi";
import Crowdfund from "../../contracts/ABI/Crowdfund.json";

type address = `0x${string}`;

type ReturnType = { abi: string[]; address: address };

const abi = {
  Crowdfund,
};

export const useContractConfig = (name: keyof typeof abi) => {
  const { chain } = useNetwork();

  return {
    abi: abi[name],
  };
  // if (chain?.id) {
  //   const config = contractConfig[name] || { address: {}, abi: [] };

  //   return { address: config.address[chain.id], abi: config.abi } as ReturnType;
  // }

  // return {} as ReturnType;
};
