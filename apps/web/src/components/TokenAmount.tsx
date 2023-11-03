import { ethers } from "ethers";
import { Address, useToken } from "wagmi";
import { formatMoney } from "~/utils/currency";
import { isNativeToken } from "~/utils/token";
import { Skeleton } from "./ui/Skeleton";
import { DM_Mono } from "next/font/google";
const dm_mono = DM_Mono({weight: '400', subsets: ['latin']});

export const TokenAmount = ({
  amount,
  token,
}: {
  amount: string;
  token: Address;
}) => {
  const { data, isLoading } = useToken({
    address: token,
    enabled: !isNativeToken(token),
  });

  const formatted = (val = "0") =>
    ethers.utils.formatUnits(val, data?.decimals);

  const symbol = data?.symbol || isLoading ? "" : "ETH";
  return (
    <Skeleton className={`${dm_mono.className} w-24`} isLoading={isLoading}>
      {symbol} {formatMoney(formatted(amount))}
    </Skeleton>
  );
};
