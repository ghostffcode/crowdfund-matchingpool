import { GetServerSidePropsContext, type NextPage } from "next";
import Head from "next/head";

import site from "~/config/site";
import { MatchingPool } from "~/types";
import { Layout } from "~/layouts/Layout";
import { Leaderboard } from "~/components/PoolLeaderboard";
import { Organizers } from "~/components/PoolOrganizers";
import { RaisedProgress } from "~/components/RaisedProgress";
import { pool, poolMetadata } from "~/data/mock";
import { PoolDetails } from "~/components/PoolDetails";
import { useState } from "react";
import { ContributeForm } from "~/components/ContributeForm";
import { Button } from "~/components/ui/Button";
import { fetchIpfs } from "~/utils/ipfs";
import { queryCrowdfund } from "~/hooks/useCrowdfund";
import { Address } from "wagmi";

const appUrl =
  process.env.NODE_ENV === "production" ? site.url : "http://localhost:3000";

const ViewMatchingPool: NextPage<{ address: string } & MatchingPool> = ({
  address,
  title,
  description,
  token,
  goal,
  totalDonations,
  safe,
  donations,
  ...rest
}) => {
  const [isOpen, setOpen] = useState(false);
  const ogImage = `${appUrl}/api/og?crowdfundAddress=${address}`;

  console.log({
    address,
    title,
    description,
    token,
    goal,
    totalDonations,
    safe,
    donations,
    ...rest,
  });
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
        <Organizers safe={safe} />
        <RaisedProgress
          token={token}
          goal={goal}
          totalDonations={totalDonations}
        />
        {isOpen ? (
          <div className="bg-white p-8 shadow-xl">
            <ContributeForm
              token={token}
              address={address as Address}
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
        <Leaderboard donations={donations} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const address = (ctx.params?.address as string).toLowerCase();
  const crowdfund = await queryCrowdfund({ address });
  if (!crowdfund) {
    return {
      notFound: true,
    };
  }

  const metadata = (await fetchIpfs(crowdfund.metaPtr)) || {
    title: "NO_METADATA_TITLE",
    description: "NO_METADATA_DESCRIPTION",
  };

  return {
    props: {
      address,
      ...metadata,
      ...crowdfund,
      organizers: [crowdfund.creator],
    },
  };
}

export default ViewMatchingPool;
