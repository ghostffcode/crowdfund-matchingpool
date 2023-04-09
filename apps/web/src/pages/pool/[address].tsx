import { GetServerSidePropsContext, type NextPage } from "next";
import { request, gql } from "graphql-request";

import Head from "next/head";

import { MatchingPool } from "~/types";
import { Layout } from "~/layouts/Layout";
import { Leaderboard } from "~/components/PoolLeaderboard";
import { Organizers } from "~/components/PoolOrganizers";
import { RaisedProgress } from "~/components/RaisedProgress";
import { contributors, organizers, pool, poolMetadata } from "~/data/mock";
import { PoolDetails } from "~/components/PoolDetails";
import { useState } from "react";
import { ContributeForm } from "~/components/ContributeForm";
import { Button } from "~/components/ui/Button";

const appUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}.vercel.app`
  : "http://localhost:3000";

const ViewMatchingPool: NextPage<MatchingPool> = ({
  address,
  title,
  description,
  token,
  funds,
  contributors,
  organizers,
}) => {
  const [isOpen, setOpen] = useState(false);

  const ogImage = `${appUrl}/api/og?crowdfundAddress=${address}`;
  return (
    <Layout>
      <Head>
        <meta property="og:image" content={ogImage} />
        <meta property="twitter:image" content={ogImage} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <div className="flex flex-col gap-16">
        <PoolDetails title={title} description={description} />
        <Organizers organizers={organizers} />
        <RaisedProgress funds={funds} />
        {isOpen ? (
          <div className="bg-white p-8 shadow-xl">
            <ContributeForm
              token={token}
              address={address}
              onSuccess={() => setOpen(false)}
            />
          </div>
        ) : (
          <Button
            color="primary"
            size="lg"
            className="w-full"
            onClick={() => setOpen(true)}
          >
            Contribute now
          </Button>
        )}
        <Leaderboard contributors={contributors} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const address = ctx.params?.address as string;

  // Fetch from subgraph or contract
  const { goal } = pool;

  // Fetch from ipfs
  const { title, description } = poolMetadata;

  // Fetch from subgraph
  const raised = "15000";
  const token = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  try {
    const crowdfund = await queryCrowdfund(address);
    console.log(crowdfund);
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      address,
      title,
      description,
      token,
      funds: {
        raised,
        goal,
      },
      organizers,
      contributors,
    },
  };
}

async function queryCrowdfund(address: string) {
  const subgraphUrl = process.env.SUBGRAPH_URL || "";
  return request(
    subgraphUrl,
    gql`
      query getCrowdfund($id: ID!) {
        Crowdfund(id: $id) {
          token
          metaPtr
          totalDonations
          donations {
            amount
            balance
            user {
              id
            }
          }
        }
      }
    `
  );
}

export default ViewMatchingPool;
