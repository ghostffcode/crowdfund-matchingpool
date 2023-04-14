import { GetServerSidePropsContext, type NextPage } from "next";
import Link from "next/link";
import { TokenAmount } from "~/components/TokenAmount";
import { queryCrowdfunds } from "~/hooks/useCrowdfund";
import { Layout } from "~/layouts/Layout";
import { fetchIpfs } from "~/utils/ipfs";
import { truncate } from "~/utils/truncate";

import { MatchingPool } from "~/types";

const Home: NextPage<{ crowdfunds: MatchingPool[] }> = ({
  crowdfunds = [],
}) => {
  console.log(crowdfunds);
  return (
    <Layout>
      <div className="flex flex-col gap-4">
        {crowdfunds.map((cf) => (
          <Link
            href={`/pool/${cf.id}`}
            key={cf.id}
            className="flex gap-2 p-4 hover:bg-black/10"
          >
            <div className="h-16 w-16 bg-black/50"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold">{cf.title}</div>
                <div className="flex gap-2">
                  <TokenAmount token={cf.token} amount={cf.totalDonations} />
                  <div>/</div>

                  <TokenAmount token={cf.token} amount={cf.goal} />
                </div>
              </div>
              <div>{truncate(cf.description, 80)}</div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const crowdfunds =
    (await Promise.all(
      (
        await queryCrowdfunds({})
      ).map(async (crowdfund: MatchingPool) => {
        const metadata = await fetchIpfs(crowdfund.metaPtr);
        return {
          ...crowdfund,
          ...metadata,
        };
      })
    )) || [];

  return {
    props: {
      crowdfunds,
    },
  };
}

export default Home;
