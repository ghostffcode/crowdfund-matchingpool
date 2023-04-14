import { ImageResponse } from "@vercel/og";
import { ethers } from "ethers";
import { NextRequest } from "next/server";
import { RadialSVG, RadialSVGRight } from "~/components/RadialSVG";
import {
  currentValueStyle,
  indicatorStyle,
  maxValueStyle,
  progressBarStyle,
  wrapperStyle,
} from "~/components/RaisedProgress";
import { pool, poolMetadata } from "~/data/mock";
import { queryCrowdfund } from "~/hooks/useCrowdfund";
import { formatMoney } from "~/utils/currency";
import { isNativeToken } from "~/utils/token";

export const config = {
  runtime: "edge",
};

// Duplicate of utils/ifps
const fetchMetadata = async (cid: string) => {
  const ipfsGateway =
    process.env.NEXT_PUBLIC_IPFS_GATEWAY || "https://w3s.link/ipfs/";

  return fetch(`${ipfsGateway}${cid}`, {
    headers: { "content-type": "application/json" },
  }).then((r) => (r.ok ? r.json() : null));
};

const fetchToken = async (address: string) => {
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      id: 1,
      jsonrpc: "2.0",
      method: "alchemy_getTokenMetadata",
      params: [address],
    }),
  };

  return fetch(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
    options
  )
    .then((res) => res.json())
    .then((r) => r.result);
};

const fetchFont = (weight = "400") =>
  fetch(
    new URL("../../../public/inter-latin-400-normal.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

const truncate = (str = "", maxLength = Infinity) => {
  return str.length >= maxLength ? str.slice(0, maxLength) + "..." : str;
};
export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("crowdfundAddress")?.toLocaleLowerCase();
    if (!address) {
      throw new Error("No crowdfund address provided");
    }
    const crowdfund = (await queryCrowdfund({ address })) || pool;
    if (!crowdfund) {
      throw new Error("No crowdfund found");
    }

    const { title, description } =
      (await fetchMetadata(crowdfund.metaPtr)) || poolMetadata;

    // Fetch token to get correct decimals in formatting
    const token = isNativeToken(crowdfund.token)
      ? {}
      : await fetchToken(crowdfund.token);

    const inter400 = await fetchFont("400");
    // Not getting font weights to work with Satori
    // const inter600 = await fetchFont("600");
    // const inter900 = await fetchFont("900");

    const { goal = "0", totalDonations = "0" } = crowdfund;

    const percentage = `${(+"0" / +goal) * 100}%`;

    const formatAmount = (val: string) =>
      formatMoney(ethers.utils.formatUnits(val, token.decimals));

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
            <div tw="flex absolute" style={{ width: 444, height: 845 }}>
              <RadialSVG />
            </div>
            <div
              tw="flex absolute right-0 -bottom-72"
              style={{ width: 444, height: 845 }}
            >
              <RadialSVGRight />
            </div>
            <div tw="flex flex-col pl-80 pr-32 pt-32">
              <div tw="flex flex-col mb-8">
                <span tw="mb-4 text-6xl font-black uppercase text-black/70">
                  {title}
                </span>
                <span tw="text-2xl">{truncate(description, 255)}</span>
              </div>

              <div tw={wrapperStyle + " text-3xl"} style={{}}>
                <div
                  tw={progressBarStyle}
                  style={{
                    width: percentage,
                    backgroundImage:
                      "linear-gradient(to right, #80FFBB, #E6FF4D)",
                  }}
                />
                <span tw={indicatorStyle} style={{ left: percentage }} />
                <span
                  tw={currentValueStyle}
                  style={{ left: percentage, transform: `translateX(-50%)` }}
                >
                  {formatAmount(totalDonations)} Raised
                </span>
                <span tw={maxValueStyle + " flex justify-end"}>
                  {formatAmount(goal)} Goal
                </span>
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
        fonts: [
          {
            name: "Inter",
            data: inter400,
            weight: 400,
          },
          // {
          //   name: "Inter",
          //   data: inter600,
          //   weight: 600
          // },
          // {
          //   name: "Inter",
          //   data: inter900,
          //   weight: 900
          // },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
