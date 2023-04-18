import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { Address } from "wagmi";
import { useDonations } from "~/hooks/useCrowdfund";
import { Donation } from "~/types";
import { EnsAvatar } from "./EnsAvatar";
import { EnsName } from "./EnsName";
import { TokenAmount } from "./TokenAmount";
import { Button } from "./ui/Button";

type Props = { address: Address; token: Address; donations: Donation[] };

export const Leaderboard = ({ address, token, donations = [] }: Props) => {
  const [{ first, skip }, loadMore] = useReducer(
    (state) => ({ ...state, skip: state.skip + 100 }),
    { first: 100, skip: 0 }
  );

  const { data } = useDonations(
    {
      address,
      first,
      skip,
    },
    donations
  );

  return (
    <section>
      <h4 className="mb-2 text-xl font-bold">Leaderboard</h4>
      <div className="mb-4 flex flex-col divide-y divide-solid">
        {!data.length ? (
          <div className="text-center">No contributions yet</div>
        ) : (
          data.map((donation: Donation) => (
            <div
              key={donation.user.address}
              className="flex  border-black/80 py-6"
            >
              <EnsAvatar
                address={donation.user.address}
                size="sm"
                color="gray"
              />
              <div className="flex flex-1 items-center justify-between pl-4">
                <EnsName address={donation.user.address} />
                <div>
                  <TokenAmount amount={donation.amount} token={token} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center">
        {data.length ? (
          <Button className="w-72" onClick={loadMore} variant="ghost">
            Load more
          </Button>
        ) : null}
      </div>
    </section>
  );
};
