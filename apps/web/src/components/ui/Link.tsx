import { tv } from "tailwind-variants";

import NextLink from "next/link";
import { createComponent } from ".";

const link = {
  base: "text-primary-500 hover:text-primary-700",
};

export const Link = createComponent(NextLink as any, tv(link));
