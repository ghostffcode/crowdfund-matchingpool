import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { RadialSVG } from "~/components/RadialSVG";
import {
  currentValueStyle,
  indicatorStyle,
  maxValueStyle,
  progressBarStyle,
  wrapperStyle,
} from "~/components/RaisedProgress";
import { pool, poolMetadata } from "~/data/mock";
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
    const poolAddress = searchParams.get("poolAddress");
    if (!poolAddress) return null;

    const { goal } = pool;

    // Fetch from ipfs
    const { title, description } = poolMetadata;

    // Fetch from subgraph
    const raised = "15000";

    const percentage = `${(+raised / +goal) * 100}%`;

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
          <div tw="bg-[#FFE767] w-full h-full flex flex-col justify-between relative">
            <div
              tw="flex absolute"
              style={{
                width: 444,
                height: 845,
              }}
            >
              <RadialSVG />
            </div>
            <div tw="flex flex-col pl-64 pr-32 pt-32">
              <div tw="flex flex-col mb-8">
                <span tw="mb-4 text-6xl font-black uppercase text-black/70">
                  {title}
                </span>
                <span tw="text-2xl">{description}</span>
              </div>

              <div tw={wrapperStyle} style={{}}>
                <span tw={progressBarStyle} style={{ width: percentage }} />
                <span tw={indicatorStyle} style={{ left: percentage }} />
                <span
                  tw={currentValueStyle}
                  style={{ left: percentage, transform: `translateX(-50%)` }}
                >
                  {formatMoney(raised)} Raised
                </span>
                <span tw={maxValueStyle}>{formatMoney(goal)} Goal</span>
              </div>
            </div>
            <div tw="flex justify-end p-1">
              <span>Last updated: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // debug: true,
        // fonts: [{
        //   name: "Inter",
        //   data: null
        // }]
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
