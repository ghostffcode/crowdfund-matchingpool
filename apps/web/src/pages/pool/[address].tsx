import { type NextPage } from "next";
import { Avatar } from "~/components/ui/Avatar";
import { Button } from "~/components/ui/Button";
import { Link } from "~/components/ui/Link";
import { Progress } from "~/components/ui/Progress";
import { Stat, StatNumber, StatText } from "~/components/ui/Stat";
import { poolMetadata } from "~/data/mock";
import { Layout } from "~/layouts/Layout";

const organizers = [
  {
    address: "owocki.eth",
    image: "",
  },
  {
    address: "stephenreid.eth",
    image: "",
  },
];

const contributors = [
  {
    address: "supermodular.eth",
    image: "",
    amount: "9k",
  },
  {
    address: "bliss.eth",
    image: "",
    amount: "1k",
  },
];

const notImplemented = () => alert("not implemented");
const ContributeButton = () => (
  <Button onClick={notImplemented} className="w-full">
    Contribute now
  </Button>
);
const ViewMatchingPool: NextPage = () => {
  return (
    <Layout>
      <h1 className="mb-2 text-3xl">{poolMetadata.title}</h1>
      <h3 className="text-xl leading-8">{poolMetadata.description}</h3>
      <div className="pb-8" />

      <div className="flex flex-col gap-8">
        <div className="">
          <div className="flex justify-between">
            <Stat>
              <StatNumber>$10k</StatNumber>
              <StatText>raised</StatText>
            </Stat>
            <Stat>
              <StatNumber>$25k</StatNumber>
              <StatText className="text-right">goal</StatText>
            </Stat>
          </div>
          <Progress size="lg" value={50} />
        </div>
        <ContributeButton />
        <div className="">
          <h4 className="mb-2 font-bold">Organized by</h4>
          <div className="flex gap-4">
            {organizers.map((org) => (
              <div
                key={org.address}
                className="group flex flex-col items-center justify-center"
              >
                <Avatar className="mb-1" size="sm" color="gray" />
                <div>{org.address}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h4 className="mb-2 font-bold">Leaderboard</h4>
          <div className="flex flex-col gap-2">
            {contributors.map((user) => (
              <div key={user.address} className="flex p-2">
                <Avatar size="sm" color="gray" />
                <div className="flex flex-1 items-center justify-between pl-4">
                  <div>{user.address}</div>
                  <div className="font-bold">${user.amount}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={notImplemented} variant="ghost">
              Load more
            </Button>
          </div>
        </div>
        <ContributeButton />
      </div>
    </Layout>
  );
};

export default ViewMatchingPool;
