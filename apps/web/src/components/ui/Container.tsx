import { createComponent } from ".";
import { tv } from "tailwind-variants";

const container = tv({
  base: "max-w-md mx-auto",
});

export const Container = createComponent("section", container);
