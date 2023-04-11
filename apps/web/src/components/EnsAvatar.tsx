import { ComponentPropsWithoutRef } from "react";
import { Address, useEnsAvatar } from "wagmi";
import { Avatar } from "./ui/Avatar";

type Props = ComponentPropsWithoutRef<typeof Avatar> & {
  address: Address;
  color: string;
  size: string;
};

export const EnsAvatar = ({ address, ...props }: Props) => {
  const avatar = useEnsAvatar({
    address,
    enabled: Boolean(address),
    chainId: 1, // Resolve ENS on mainnet
  });

  return <Avatar src={avatar.data!} {...props} />;
};
