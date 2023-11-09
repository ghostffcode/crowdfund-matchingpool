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
      <a href={`https://etherscan.io/address/${address}`} target="_blank" rel="noreferrer" className="font-mono">
      {ens.data || <span title={address}>{truncateAddress(address)}</span>}
      </a>
    </Skeleton>
  );
};

const truncateAddress = (str = "", max = 14, sep = "...") => {
  const len = str.length;
  if (len > max) {
    const seplen = sep.length;

    if (seplen > max) {
      return str.substr(len - max);
    }

    const n = -0.5 * (max - len - seplen);
    const center = len / 2;
    const front = str.substr(0, center - n);
    const back = str.substr(len - center + n);

    return front + sep + back;
  }

  return str;
};
