import { useNetwork } from "wagmi";
import Crowdfund from "../../contracts/ABI/Crowdfund.json";
import CrowdfundFactory from "../../contracts/ABI/CrowdfundFactory.json";

type address = `0x${string}`;

type ReturnType = { abi: string[]; address: address };

const abi = {
  Crowdfund,
  CrowdfundFactory,
};

const config = {
  CrowdfundFactory: {
    abi: CrowdfundFactory,
    address: {
      5: "0x7ce05db48e2b450fa292d8ba482ba859f398935e",
    },
  },
  Crowdfund: {
    abi: Crowdfund,
    address: {},
  },
};

export const useContractConfig = (name: keyof typeof abi) => {
  const { chain } = useNetwork();
  const { abi, address } = config[name];
  return {
    abi,
    address: address[chain?.id as keyof typeof address],
  };
};
