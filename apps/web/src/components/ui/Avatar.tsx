import { tv } from "tailwind-variants";

import * as RadixAvatar from "@radix-ui/react-avatar";
import { createComponent } from ".";
import { Image } from "./Image";

const avatar = tv({
  base: "block rounded-full relative",
  variants: {
    color: {
      primary: "bg-primary-600",
    },
    size: {
      sm: "w-10 h-10",
      md: "w-20 h-20",
      lg: "w-48 h-48",
    },
  },

  defaultVariants: {
    size: "md",
    color: "primary",
  },
});

const Wrapper = createComponent(RadixAvatar.Root, avatar);

export const Avatar = ({ src = "", alt = "", ...props }) => (
  <Wrapper {...props}>
    <Image
      as={RadixAvatar.Image}
      className="object-cover object-center"
      src={src}
      alt={alt}
    />
    <RadixAvatar.Fallback className="block h-full w-full" />
  </Wrapper>
);
