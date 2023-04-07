import { createComponent } from ".";
import { tv } from "tailwind-variants";

const button = tv({
  base: "inline-flex justify-center items-center tracking-wide text-gray-50 active:opacity-90 transition-colors",
  variants: {
    color: {
      default: "bg-gray-200 hover:bg-gray-300 text-gray-900",
      primary: "text-primary-200 bg-primary-600 hover:opacity-90",
      dark: "bg-gray-900 text-gray-50 hover:bg-gray-700",
    },
    size: {
      sm: "p-2 text-sm",
      md: "px-3 py-2 text-md",
      lg: "px-5 py-4 text-lg text-xl",
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
});

export const Button = createComponent("button", button);
