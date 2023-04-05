import { tv } from "tailwind-variants";
import { createComponent } from ".";

const stat = tv({ base: "text-gray-600" });

const label = tv({ base: "text-sm" });
const number = tv({ base: "text-2xl leading-none font-bold" });
const text = tv({ base: "text-sm" });

export const Stat = createComponent("dl", stat);
export const StatLabel = createComponent("dt", label);
export const StatNumber = createComponent("dd", number);
export const StatText = createComponent("dd", text);
