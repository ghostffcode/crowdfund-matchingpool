import { Address, useEnsName } from "wagmi";
import { Skeleton } from "./ui/Skeleton";

export const EnsName = ({ address }: { address: Address }) => {
  const ens = useEnsName({
    address,
    enabled: Boolean(address),
    chainId: 1, // Resolve ENS on mainnet
  });

  const displayAddress = `${address.slice(0, 6)}...${address.slice(-6)}`

  return (
    <Skeleton className="w-24" isLoading={ens.isLoading}>
      <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noreferrer">
      {ens.data || displayAddress}
      </a>
    </Skeleton>
  );
};
