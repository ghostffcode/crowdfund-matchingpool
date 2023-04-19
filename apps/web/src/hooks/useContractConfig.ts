import { Address, useNetwork } from "wagmi";

import ContractConfig from "../../contracts/hardhat_contracts.json";

type ReturnType = { abi: string[]; address: Address };

const { CrowdfundImplementation, CrowdfundFactory } = ContractConfig[5][0]
  ?.contracts as any;

const config = {
  CrowdfundFactory: {
    abi: CrowdfundFactory.abi,
    address: {
      5: CrowdfundFactory.address,
    },
  },
  Crowdfund: {
    abi: CrowdfundImplementation.abi,
    address: {},
  },
};

export const useContractConfig = (name: keyof typeof config) => {
  const { chain } = useNetwork();
  const { abi, address } = config[name];

  return {
    abi,
    address: address[chain?.id as keyof typeof address] as Address,
  };
};
