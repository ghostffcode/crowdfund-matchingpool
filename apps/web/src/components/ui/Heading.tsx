import { tv } from "tailwind-variants";

import { createComponent } from ".";

const heading = {
  base: "font-medium font-pp-mori",
};

export const Heading = createComponent('h1' as any, tv(heading));
