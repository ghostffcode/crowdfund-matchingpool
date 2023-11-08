import { GetServerSidePropsContext, type NextPage } from "next";
import Link from "next/link";
import { TokenAmount } from "~/components/TokenAmount";
import { queryCrowdfunds } from "~/hooks/useCrowdfund";
import { Layout } from "~/layouts/Layout";
import { fetchIpfs } from "~/utils/ipfs";
import { truncate } from "~/utils/truncate";

import { MatchingPool } from "~/types";
import { Button } from "~/components/ui/Button";
import { PPMori, pt_serif } from "./_app";

const Home: NextPage<{ crowdfunds: MatchingPool[] }> = ({
  crowdfunds = [],
}) => {
  console.log(crowdfunds);
  return ( 
    <Layout>
      <div className="flex flex-1 flex-col items-center text-center mb-8 bg-[#B2DAD5] bg-opacity-60 sm:p-12 p-6 rounded-md">
        <h1 className={`${PPMori.className} sm:text-4xl text-2xl mb-4 uppercase `}>Matching Pool <br/>Crowdfund Creator</h1>
        <h2 className={`${pt_serif.className}text-base mb-2`}>Want to build momentum towards your Gitcoin Grants Round?   Use this tool to host a crowdfund contributions to your Matching pool + build momentum towards a bigger + better Gitcoin campaign.</h2>
        <div className="text-center my-4">
          <Button 
          size="md">
            <Link href="/pool/create">Create Crowdfund</Link>
          </Button>
          </div>
      </div>
      <div className="flex flex-col gap-4">
        {crowdfunds.map((cf) => (
          <Link
            href={`/pool/${cf.id}`}
            key={cf.id}
            className="flex gap-2 p-4 hover:bg-transparent transition-all duration-200 hover:-translate-y-[2px] bg-[#f5f5f5] border-2 border-[#f5f5f5]  rounded-md"
          >
            <div className="h-16 w-16 bg-gradient-to-r from-[#B2DAD5] to-[#FEEFBE] rounded-md"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className={`${PPMori.className} text-xl font-[500]`}>{cf.title}</div>
                <div className="flex gap-2">
                  <TokenAmount token={cf.token} amount={cf.totalDonations} />
                  <div>/</div>

                  <TokenAmount token={cf.token} amount={cf.goal} />
                </div>
              </div>
              <div className={pt_serif.className}>{truncate(cf.description, 80)}</div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};


export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const oldCrowdfundsIds = [
  '0x2d26e03ada901193970e1aa193b7d9fed736726b',
   '0x74ad514636f1386f374e1107435f35d393d0b279',
   '0xed6a325127b7347715624d7b238ad0347dd04e48',
   '0xfd87a966294e29af331842b6a1426c541a41d9b6']
   
  const crowdfunds =
    (await Promise.all(
      (
        await queryCrowdfunds({})
      )
      .filter((crowdfund: MatchingPool) => !oldCrowdfundsIds.includes(crowdfund.id))
      ?.map(async (crowdfund: MatchingPool) => {
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
