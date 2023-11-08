import { createComponent } from ".";
import { tv } from "tailwind-variants";
import { dm_mono } from "~/pages/_app";

const button = {
  base: `${dm_mono.className} rounded-lg font-[500] inline-flex justify-center items-center text-gray-50 active:opacity-90 transition-colors`,
  variants: {
    color: {
      default: "bg-black hover:bg-gray-800 text-[#fbf7f3]",
      primary: "text-white bg-[#8e81f0] hover:opacity-90",
      dark: "bg-gray-900 text-gray-50 hover:bg-gray-700",
    },
    size: {
      sm: "p-2 text-sm",
      md: "px-5 py-2 text-lg",
      lg: "px-6 py-3 text-xl",
    },
    variant: {
      ghost: "bg-transparent hover:bg-black/10",
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  compoundVariants: [],
  defaultVariants: {
    size: "md",
    color: "default",
  },
};

export const Button = createComponent("button", tv(button));
