import { GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";

import { MatchingPool } from "~/types";
import { Layout } from "~/layouts/Layout";
import { ContributeButton } from "~/components/ContributeButton";
import { Leaderboard } from "~/components/PoolLeaderboard";
import { Organizers } from "~/components/PoolOrganizers";
import { RaisedProgress } from "~/components/RaisedProgress";
import { contributors, organizers, pool, poolMetadata } from "~/data/mock";
import { PoolDetails } from "~/components/PoolDetails";

const appUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const ViewMatchingPool: NextPage<MatchingPool> = ({
  address,
  title,
  description,
  funds,
  contributors,
  organizers,
}) => {
  console.log(funds);
  return (
    <Layout>
      <Head>
        <meta
          property="og:image"
          content={`${appUrl}/api/og?poolContract=${address}`}
        />
      </Head>

      <div className="flex flex-col gap-16">
        <PoolDetails title={title} description={description} />
        <Organizers organizers={organizers} />
        <RaisedProgress funds={funds} />
        <ContributeButton address={address} />
        <Leaderboard contributors={contributors} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  // Fetch from subgraph or contract
  const { goal } = pool;

  // Fetch from ipfs
  const { title, description } = poolMetadata;

  // Fetch from subgraph
  const raised = "15000";

  return {
    props: {
      address: ctx.params?.address,
      title,
      description,
      funds: {
        raised,
        goal,
      },
      organizers,
      contributors,
    },
  };
}

export default ViewMatchingPool;
