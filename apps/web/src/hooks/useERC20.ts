import { BigNumber } from "ethers";
import {
  Address,
  erc20ABI,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { useInvalidate } from "./useInvalidate";
import { isNativeToken } from "~/utils/token";

type ERC20Args = {
  token: Address;
  spender: Address;
  owner: Address;
  to: Address;
  amount: BigNumber;
};

type ApproveArgs = Omit<ERC20Args, "to" | "owner">;
export function useApprove({ token, spender, amount }: ApproveArgs) {
  const { config, error } = usePrepareContractWrite({
    address: token,
    abi: erc20ABI,
    args: [spender, amount],
    functionName: "approve",
  });

  const approve = useContractWrite(config);

  // Refetch allowances when transaction has been mined
  const tx = useInvalidate(approve.data?.hash, {
    functionName: "allowance",
    address: token,
  });

  return {
    ...approve,
    isLoading: approve.isLoading || tx.isLoading,
  };
}

type AllowanceArgs = Omit<ERC20Args, "to" | "amount">;
export function useAllowance({ token, spender, owner }: AllowanceArgs) {
  return useContractRead({
    address: token,
    abi: erc20ABI,
    functionName: "allowance",
    args: [owner, spender],
    enabled: Boolean(!isNativeToken(token) && token && spender && owner),
  });
}
