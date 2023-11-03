import { createComponent } from "./ui";
import { tv } from "tailwind-variants";
import { Address } from "wagmi";
import { TokenAmount } from "./TokenAmount";
import { DM_Mono } from "next/font/google";

const dm_mono = DM_Mono({weight: '400', subsets: ['latin']});

type Props = { token: Address; goal: string; totalDonations: string };

export const RaisedProgress = ({ token, goal, totalDonations }: Props) => {
  const percentage = `${(+totalDonations / +goal) * 100}%`;

  return (
    <Wrapper className={`text-lg ${dm_mono.className}`}>
      <ProgressBar style={{ width: percentage }} />
      <Indicator style={{ left: percentage }} />
      <CurrentValue style={{ left: percentage, transform: `translateX(-50%)` }}>
        <TokenAmount amount={totalDonations} token={token} /> Raised
      </CurrentValue>
      <MaxValue>
        <TokenAmount amount={goal} token={token} /> Goal
      </MaxValue>
    </Wrapper>
  );
};

export const wrapperStyle =
  "flex mb-6 w-full border-2 border-black/50 relative bg-[#FAF7F3]";

export const progressBarStyle =
  "absolute h-full bg-gradient-to-r from-[#FFE5F8] to-[#FEEFBE]";

export const indicatorStyle =
  "absolute -top-2 h-16 border-2 border-r border-black/50";

export const currentValueStyle = "absolute top-14  font-semibold text-black/50";

export const maxValueStyle =
  "w-full p-2 text-right font-semibold text-black/50 relative z-10";

const Wrapper = createComponent("div", tv({ base: wrapperStyle }));
const ProgressBar = createComponent("div", tv({ base: progressBarStyle }));
const Indicator = createComponent("div", tv({ base: indicatorStyle }));
const MaxValue = createComponent("div", tv({ base: maxValueStyle }));
const CurrentValue = createComponent("div", tv({ base: currentValueStyle }));
