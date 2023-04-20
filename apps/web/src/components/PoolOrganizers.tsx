import { Address, useContractRead } from "wagmi";
import { EnsAvatar } from "./EnsAvatar";
import { EnsName } from "./EnsName";
import { Skeleton } from "./ui/Skeleton";
import { useEffect, useState } from "react";

type Props = { safe: Address };

const abi = [
  {
    inputs: [],
    name: "getOwners",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
export const Organizers = ({ safe }: Props) => {
  const [isLoaded, setLoaded] = useState(false);

  const { data, isLoading, error } = useContractRead({
    address: safe,
    abi,
    functionName: "getOwners",
    enabled: Boolean(safe),
    chainId: 137,
  });

  // Fixes hydration issue
  useEffect(() => setLoaded(true), []);
  if (!isLoaded) return null;

  const organizers = (data || Array.from({ length: 3 })) as Address[];

  return (
    <section>
      <h4 className="mb-6 text-center text-xl font-bold">Organized by</h4>
      {error ? (
        <div className="text-center">Couldn&apos;t load organizers</div>
      ) : null}
      <div className="flex justify-center">
        <div className="flex gap-10 overflow-x-auto">
          {organizers.map((address, i) => (
            <div
              key={address || i}
              className="group flex flex-col items-center justify-center"
            >
              <EnsAvatar
                address={address}
                className="mb-1"
                color="gray"
                size="md"
              />
              <div className="text-lg font-bold">
                <Skeleton className="h-4 w-24" isLoading={isLoading}>
                  <EnsName address={address} />
                </Skeleton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
