import { createComponent } from ".";
import { tv } from "tailwind-variants";

const container = {
  base: "max-w-screen-sm mx-auto px-5",
};

export const Container = createComponent("section", tv(container));
