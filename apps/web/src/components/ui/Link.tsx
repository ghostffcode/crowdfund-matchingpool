import { tv } from "tailwind-variants";

import NextLink from "next/link";
import { createComponent } from ".";

const link = tv({
  base: "text-primary-500 hover:text-primary-700",
});

export const Link = createComponent(NextLink as any, link);
