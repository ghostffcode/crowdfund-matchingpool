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

type Props = {
  token: Address;
  address: Address;
  title: string;
  onSuccess: () => void;
};

export const ContributeForm = ({ token, address, title, onSuccess }: Props) => {
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

  // TODO : Remove this for later
  const showSuggestedAmounts =
    address.toLowerCase() === "0x74ad514636f1386f374e1107435f35d393d0b279";

  const suggestedAmounts = ["0.69", "0.420", "0.1337"];

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
        <h3 className="mb-4 text-center text-lg font-[500]">
          Thank you for your contribution!
        </h3>
        <div className="mb-2">Here&apos;s a link to share on socials:</div>
        <Input value={window.location.href} readOnly />
        <div className="flex flex-1 items-end justify-end mt-3">
          <span className="bg-primary-600 text-white p-3 px-4 rounded-full flex flex-row">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M22.2125 5.65605C21.4491 5.99375 20.6395 6.21555 19.8106 6.31411C20.6839 5.79132 21.3374 4.9689 21.6493 4.00005C20.8287 4.48761 19.9305 4.83077 18.9938 5.01461C18.2031 4.17106 17.098 3.69303 15.9418 3.69434C13.6326 3.69434 11.7597 5.56661 11.7597 7.87683C11.7597 8.20458 11.7973 8.52242 11.8676 8.82909C8.39047 8.65404 5.31007 6.99005 3.24678 4.45941C2.87529 5.09767 2.68005 5.82318 2.68104 6.56167C2.68104 8.01259 3.4196 9.29324 4.54149 10.043C3.87737 10.022 3.22788 9.84264 2.64718 9.51973C2.64654 9.5373 2.64654 9.55487 2.64654 9.57148C2.64654 11.5984 4.08819 13.2892 6.00199 13.6731C5.6428 13.7703 5.27232 13.8194 4.90022 13.8191C4.62997 13.8191 4.36771 13.7942 4.11279 13.7453C4.64531 15.4065 6.18886 16.6159 8.0196 16.6491C6.53813 17.8118 4.70869 18.4426 2.82543 18.4399C2.49212 18.4402 2.15909 18.4205 1.82812 18.3811C3.74004 19.6102 5.96552 20.2625 8.23842 20.2601C15.9316 20.2601 20.138 13.8875 20.138 8.36111C20.138 8.1803 20.1336 7.99886 20.1256 7.81997C20.9443 7.22845 21.651 6.49567 22.2125 5.65605Z"></path></svg>
            <a
              href={`https://twitter.com/intent/tweet?text=I just donated to the ${title} ${window.location.href}`}
              target="_blank"
              rel="noreferrer"
            >
              Tweet this
            </a>
          </span>
        </div>
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
        <div className="mb-4 flex bg-gray-200">
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
        <div className="mt-2 flex flex-col md:flex-row items-center justify-between">
          {showSuggestedAmounts && (
            <div className="text-sm mb-3 md:mb-0">
              {suggestedAmounts.map((_amount: string) => (
                <span
                  className="mr-2 rounded border px-2 py-2 hover:bg-gray-200"
                  role="button"
                  key={_amount}
                  onClick={() => form.setValue("amount", _amount)}
                >
                  {_amount} Ξ
                </span>
              ))}
            </div>
          )}
          {/* <div className={isNativeToken(token) ? "invisible" : ""}>
            Allowance: {utils.formatUnits(allowance.data || "0", decimals)}{" "}
            {symbol}
          </div> */}
          <div>
            Balance: {Number(formatted).toFixed(4)} {symbol}
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
