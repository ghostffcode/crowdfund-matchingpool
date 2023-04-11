import { Address, useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";

export function useENS(address: Address) {
  const enabled = Boolean(address);
  const ens = useEnsName({ address, enabled });
  const avatar = useEnsAvatar({ address, enabled });
  return {
    isLoading: ens.isLoading || avatar.isLoading,
  };
}
