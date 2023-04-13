import { formatMoney } from "~/utils/currency";
import { EnsAvatar } from "./EnsAvatar";
import { EnsName } from "./EnsName";
import { Button } from "./ui/Button";

export const Leaderboard = ({ donations = [] }: { donations: any[] }) => {
  return (
    <section>
      <h4 className="mb-2 text-xl font-bold">Leaderboard</h4>
      <div className="mb-4 flex flex-col divide-y divide-solid">
        {!donations.length ? (
          <div className="text-center">No contributions yet</div>
        ) : (
          donations.map((donation) => (
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
                <div className="">${formatMoney(donation.amount)}</div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center">
        {donations.length ? (
          <Button
            className="w-72"
            onClick={() => alert("not implemented")}
            variant="ghost"
          >
            Load more
          </Button>
        ) : null}
      </div>
    </section>
  );
};
