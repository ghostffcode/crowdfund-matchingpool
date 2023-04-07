import { Contributor } from "~/types";
import { Avatar } from "./ui/Avatar";
import { Button } from "./ui/Button";

export const Leaderboard = ({
  contributors = [],
}: {
  contributors: Contributor[];
}) => {
  return (
    <section>
      <h4 className="mb-2 text-xl font-bold">Leaderboard</h4>
      <div className="mb-4 flex flex-col divide-y divide-solid">
        {contributors.map((user) => (
          <div key={user.address} className="flex  border-black/80 py-6">
            <Avatar size="sm" color="gray" />
            <div className="flex flex-1 items-center justify-between pl-4">
              <div>{user.address}</div>
              <div className="">${user.amount}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          className="w-72"
          onClick={() => alert("not implemented")}
          variant="ghost"
        >
          Load more
        </Button>
      </div>
    </section>
  );
};
