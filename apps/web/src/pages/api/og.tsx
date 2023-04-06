import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { poolMetadata } from "~/data/mock";
import { formatMoney } from "~/utils/currency";

export const config = {
  runtime: "edge",
};

async function getPoolDetails(address: string) {
  const metadata = poolMetadata;
  return {
    raised: 10_000,
    goal: 25_000,
    metadata,
  };
}

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    console.log(req.url, Object.entries(searchParams));
    const poolAddress = searchParams.get("poolAddress");
    console.log({ poolAddress });
    if (!poolAddress) return null;

    const pool = await getPoolDetails(poolAddress);

    const {
      metadata: { title, description },
      raised,
      goal,
    } = pool;
    const value = raised / goal;
    const symbol = "$";

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <div tw="bg-gray-50 w-full h-full flex flex-col justify-between p-16">
            <h2 tw="flex flex-col text-gray-900">
              <span tw="text-6xl tracking-tight mb-6">{title}</span>
              <span tw="text-3xl leading-10">{description}</span>
            </h2>
            <div tw="flex flex-col">
              <div tw="flex justify-between">
                <Stats value={formatMoney(raised, "USD")} label="Raised" />
                <Stats value={formatMoney(goal, "USD")} label="Goal" />
              </div>
              <div tw="h-4 bg-green-200 flex">
                <div
                  tw="bg-green-600 h-full"
                  style={{ width: `${value * 100}%` }}
                />
              </div>
            </div>
            <span tw="text-right w-full">
              Last updated: {new Date().toLocaleString()}
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
const Stats = ({ value = "", label = "" }) => (
  <div tw="flex flex-col mb-2">
    <span tw="text-4xl">{value}</span>
    <span tw="text-2xl">{label}</span>
  </div>
);
