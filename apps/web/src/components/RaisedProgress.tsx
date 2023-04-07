import { Funds } from "~/types";
import { createComponent } from "./ui";
import { tv } from "tailwind-variants";
import { formatMoney } from "~/utils/currency";

type Props = { funds: Funds };

export const RaisedProgress = ({ funds }: Props) => {
  const percentage = `${(+funds.raised / +funds.goal) * 100}%`;

  return (
    <Wrapper>
      <ProgressBar style={{ width: percentage }} />
      <Indicator style={{ left: percentage }} />
      <CurrentValue style={{ left: percentage, transform: `translateX(-50%)` }}>
        {formatMoney(funds.raised)} Raised
      </CurrentValue>
      <MaxValue>{formatMoney(funds.goal)} Goal</MaxValue>
    </Wrapper>
  );
};

const Wrapper = createComponent(
  "div",
  tv({ base: "mb-6 w-full border-2 border-black/50 relative" })
);
const ProgressBar = createComponent(
  "div",
  tv({
    base: "absolute h-full bg-gradient-to-r from-[#80FFBB] to-[#E6FF4D]",
  })
);
const Indicator = createComponent(
  "div",
  tv({
    base: "absolute -top-2 h-16 border-2 border-r border-black/50",
  })
);
const MaxValue = createComponent(
  "div",
  tv({
    base: "p-2 text-right text-lg font-bold text-black/50 relative z-10",
  })
);
const CurrentValue = createComponent(
  "div",
  tv({
    base: "absolute top-14 text-lg font-bold text-black/50",
  })
);
