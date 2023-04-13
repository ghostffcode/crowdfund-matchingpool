import { Address, useEnsName } from "wagmi";
import { Skeleton } from "./ui/Skeleton";

export const EnsName = ({ address }: { address: Address }) => {
  const ens = useEnsName({
    address,
    enabled: Boolean(address),
    chainId: 1, // Resolve ENS on mainnet
  });

  return (
    <Skeleton className="w-24" isLoading={ens.isLoading}>
      {ens.data || address}
    </Skeleton>
  );
};
