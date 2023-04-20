import { useForm } from "react-hook-form";
import { Address, useAccount, useBalance } from "wagmi";
import { ethers, utils } from "ethers";

import { useAllowance, useApprove } from "~/hooks/useERC20";
import { Button } from "./ui/Button";
import { useDonate } from "~/hooks/usePool";
import ConnectWalletButton from "./ConnectWalletButton";
import { isNativeToken } from "~/utils/token";
import { useState } from "react";
import { Input } from "./ui/Form";

type Props = { token: Address; address: Address; onSuccess: () => void };

export const ContributeForm = ({ token, address, onSuccess }: Props) => {
  const [isSuccess, setSuccess] = useState(false);
  const form = useForm();
  const account = useAccount();

  const balance = useBalance({
    address: account.address,
    token: !isNativeToken(token) ? token : undefined,
  });
  const allowance = useAllowance({
    token,
    owner: account.address as Address,
    spender: address,
  });

  const { symbol = "ETH", decimals, formatted } = balance.data || {};
  const amount = utils.parseUnits(form.watch("amount") || "0", decimals);

  const approve = useApprove({ token, spender: address, amount });

  const donate = useDonate(address, () => setSuccess(true));

  const hasAllowance =
    isNativeToken(token) || (amount.gt(0) && allowance.data?.gte(amount));
  const isLoading =
    allowance.isLoading || approve.isLoading || donate.isLoading;

  const error = approve.error || donate.error;

  if (isSuccess)
    return (
      <div className="">
        <h3 className="mb-4 text-center text-lg font-bold">
          Thank you for your contribution!
        </h3>
        <div className="mb-2">Here&apos;s a link to share on socials:</div>
        <Input value={window.location.href} readOnly />
      </div>
    );
  return (
    <form
      onSubmit={form.handleSubmit((values) => {
        if (hasAllowance) {
          donate.write({
            recklesslySetUnpreparedArgs: [amount],
            // Add amount to msg.value if ETH
            recklesslySetUnpreparedOverrides: isNativeToken(token)
              ? { value: amount }
              : undefined,
          });
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
            step={0.000001}
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
          <div className={isNativeToken(token) ? "invisible" : ""}>
            Allowance: {utils.formatUnits(allowance.data || "0", decimals)}{" "}
            {symbol}
          </div>
          <div>
            Balance: {formatted} {symbol}
          </div>
        </div>
      </div>
      {!account.address ? (
        <div>
          <ConnectWalletButton />
          <div className="pt-2 text-center">
            You must connect your wallet to contribute to a matching pool.
          </div>
        </div>
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
      {error ? (
        <div className="pt-4 text-center text-red-500">{error.message}</div>
      ) : null}
    </form>
  );
};
