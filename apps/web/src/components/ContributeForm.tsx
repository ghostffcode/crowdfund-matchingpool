import { useForm } from "react-hook-form";
import { Address, useAccount, useBalance } from "wagmi";
import { utils } from "ethers";

import { useAllowance, useApprove } from "~/hooks/useERC20";
import { Button } from "./ui/Button";
import { useDonate } from "~/hooks/usePool";

type Props = { token: Address; address: Address; onSuccess: () => void };

export const ContributeForm = ({ token, address, onSuccess }: Props) => {
  const form = useForm();
  const account = useAccount();

  const balance = useBalance({ address: account.address, token });
  const allowance = useAllowance({
    token,
    owner: account.address as Address,
    spender: address,
  });

  const { symbol, decimals, formatted } = balance.data || {};
  const amount = utils.parseUnits(form.watch("amount") || "0", decimals);

  const approve = useApprove({ token, spender: address, amount });

  const donate = useDonate(address, onSuccess);

  const hasAllowance = amount.gt(0) && allowance.data?.gte(amount);
  const isLoading = allowance.isLoading || approve.isLoading;

  return (
    <form
      onSubmit={form.handleSubmit((values) => {
        if (hasAllowance) {
          donate.write({ recklesslySetUnpreparedArgs: [amount] });
        } else {
          approve.write?.();
        }
      })}
    >
      <div className="mb-8">
        <div className="mb-2 flex bg-gray-200">
          <input
            type="number"
            min={0}
            max={Number(formatted)}
            placeholder="0"
            autoFocus
            className="block w-full bg-transparent p-4 text-xl outline-none"
            {...form.register("amount")}
          />
          <div className="flex items-center justify-center px-4 text-xl text-gray-400">
            {symbol}
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            Allowance: {utils.formatUnits(allowance.data || "0", decimals)}{" "}
            {symbol}
          </div>
          <div>
            Balance: {formatted} {symbol}
          </div>
        </div>
      </div>
      {!account.address ? (
        <span>You must connect your wallet to contribute.</span>
      ) : hasAllowance ? (
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
          color="primary"
        >
          {isLoading ? "Funding..." : "Fund"}
        </Button>
      ) : (
        <Button
          disabled={isLoading || !amount.gt(0)}
          className="w-full"
          color="primary"
          type="submit"
        >
          {isLoading ? "Approving..." : "Approve"}
        </Button>
      )}
    </form>
  );
};
