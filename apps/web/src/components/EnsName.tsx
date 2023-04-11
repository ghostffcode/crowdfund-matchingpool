import { Address, useEnsName } from "wagmi";

export const EnsName = ({ address }: { address: Address }) => {
  const ens = useEnsName({
    address,
    enabled: Boolean(address),
    chainId: 1, // Resolve ENS on mainnet
  });

  return <>{ens.data || address}</>;
};
