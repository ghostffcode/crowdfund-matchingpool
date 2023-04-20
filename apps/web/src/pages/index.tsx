import { GetServerSidePropsContext, type NextPage } from "next";
import Link from "next/link";
import { TokenAmount } from "~/components/TokenAmount";
import { queryCrowdfunds } from "~/hooks/useCrowdfund";
import { Layout } from "~/layouts/Layout";
import { fetchIpfs } from "~/utils/ipfs";
import { truncate } from "~/utils/truncate";

import { MatchingPool } from "~/types";
import { Button } from "~/components/ui/Button";

const Home: NextPage<{ crowdfunds: MatchingPool[] }> = ({
  crowdfunds = [],
}) => {
  console.log(crowdfunds);
  return (
    <Layout>
      <div className="flex flex-1 flex-col items-center text-center mb-8">
        <h1 className="text-2xl mb-4 font-semibold">Matching Pool Crowdfund Creator</h1>
        <h2 className="text-base mb-2">Want to build momentum towards your Gitcoin Grants Round?   Use this tool to host a crowdfund contributions to your Matching pool + build momentum towards a bigger + better Gitcoin campaign.</h2>
        <div className="text-center my-4">
          <Button color="primary" size="sm">
            <Link href="/pool/create">Create Crowdfund</Link>
          </Button>
          </div>
      </div>
      <div className="flex flex-col gap-4">
        {/* {crowdfunds.map((cf) => (
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
        ))} */}
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
