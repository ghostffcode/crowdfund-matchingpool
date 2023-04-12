import { createComponent } from "./ui";
import { tv } from "tailwind-variants";
import { formatMoney } from "~/utils/currency";
import { Address, useToken } from "wagmi";
import { ethers } from "ethers";
import { isNativeToken } from "~/utils/token";

type Props = { token: Address; goal: string; totalDonations: string };

export const RaisedProgress = ({ token, goal, totalDonations }: Props) => {
  const percentage = `${(+totalDonations / +goal) * 100}%`;

  const { data } = useToken({
    address: token,
    enabled: !isNativeToken(token),
  });

  const formatted = (val: string) =>
    ethers.utils.formatUnits(val, data?.decimals);

  return (
    <Wrapper className="text-lg">
      <ProgressBar style={{ width: percentage }} />
      <Indicator style={{ left: percentage }} />
      <CurrentValue style={{ left: percentage, transform: `translateX(-50%)` }}>
        {formatMoney(formatted(totalDonations))} Raised
      </CurrentValue>
      <MaxValue>{formatMoney(formatted(goal))} Goal</MaxValue>
    </Wrapper>
  );
};

export const wrapperStyle =
  "flex mb-6 w-full border-2 border-black/50 relative bg-[#FFE767]";

export const progressBarStyle =
  "absolute h-full bg-gradient-to-r from-[#80FFBB] to-[#E6FF4D]";

export const indicatorStyle =
  "absolute -top-2 h-16 border-2 border-r border-black/50";

export const currentValueStyle = "absolute top-14  font-bold text-black/50";

export const maxValueStyle =
  "w-full p-2 text-right font-bold text-black/50 relative z-10";

const Wrapper = createComponent("div", tv({ base: wrapperStyle }));
const ProgressBar = createComponent("div", tv({ base: progressBarStyle }));
const Indicator = createComponent("div", tv({ base: indicatorStyle }));
const MaxValue = createComponent("div", tv({ base: maxValueStyle }));
const CurrentValue = createComponent("div", tv({ base: currentValueStyle }));
