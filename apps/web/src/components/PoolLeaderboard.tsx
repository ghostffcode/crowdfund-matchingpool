import { useMemo } from "react";
import { Address } from "wagmi";
import { DONATION_PAGE_SIZE, useDonations } from "~/hooks/useCrowdfund";
import { Donation } from "~/types";
import { EnsAvatar } from "./EnsAvatar";
import { EnsName } from "./EnsName";
import { TokenAmount } from "./TokenAmount";
import { Button } from "./ui/Button";
import { PPMori, dm_mono } from "~/pages/_app";

type Props = { address: Address; token: Address; donations: Donation[] };

export const Leaderboard = ({ address, token, donations = [] }: Props) => {
  const { data, fetchNextPage } = useDonations({ address }, donations);

  const allDonations = useMemo(
    () => data?.pages.reduce((acc, x) => acc.concat(x), []),
    [data?.pages]
  );
  return (
    <section >
      <h4 className={`${PPMori.className} mb-2 text-xl font-[500]`}>Leaderboard</h4>
      <div className={`mb-4 flex flex-col divide-y divide-solid ${dm_mono.className}`}>
        {!allDonations?.length ? (
          <div className="text-center">No contributions yet</div>
        ) : (
          allDonations?.map((donation: Donation) => (
            <div key={donation.user.id} className="flex  border-black/80 py-6">
              <EnsAvatar address={donation.user.id} size="sm" color="gray" />
              <div className="flex flex-1 items-center justify-between pl-4">
                <EnsName address={donation.user.id} />
                <div>
                  <TokenAmount amount={donation.amount} token={token} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center">
        {allDonations?.length === DONATION_PAGE_SIZE ? (
          <Button className="w-72" onClick={fetchNextPage} variant="ghost">
            Load more
          </Button>
        ) : null}
      </div>
    </section>
  );
};
