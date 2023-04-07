import { createComponent } from ".";
import { tv } from "tailwind-variants";

const container = tv({
  base: "max-w-screen-sm mx-auto px-5",
});

export const Container = createComponent("section", container);
