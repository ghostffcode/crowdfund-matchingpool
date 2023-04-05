import { createComponent } from ".";
import { tv } from "tailwind-variants";

const progress = tv({
  base: "h-1 w-full bg-gray-200",
  variants: {
    size: {
      sm: "h-1",
      md: "h-1.5",
      lg: "h-3",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const Wrapper = createComponent("div", progress);

export const Progress = ({ value = 0, max = 100, ...props }) => (
  <Wrapper {...props}>
    <div
      className="h-full bg-green-600"
      style={{ width: `${(value / max) * 100}%` }}
    />
  </Wrapper>
);
