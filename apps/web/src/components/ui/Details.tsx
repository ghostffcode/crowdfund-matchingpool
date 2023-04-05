import { tv } from "tailwind-variants";
import { createComponent } from "components/ui";

const details = tv({ base: "" });

const summary = tv({ base: "mb-2 cursor-pointer p-2 hover:bg-gray-100" });

export const Details = createComponent("details", details);
export const Summary = createComponent("summary", summary);
