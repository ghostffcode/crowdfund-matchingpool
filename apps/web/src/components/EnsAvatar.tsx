import { Address } from "wagmi";
import { Avatar } from "./ui/Avatar";

export const EnsAvatar = ({
  address,
  ...props
}: {
  address: Address;
  color: string;
  size: string;
}) => {
  const avatar = { data: "" };

  return <Avatar src={avatar.data!} {...props} />;
};
