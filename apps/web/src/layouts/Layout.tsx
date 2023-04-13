import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
import ConnectWalletButton from "~/components/ConnectWalletButton";
import {
  RadialSVG,
  RadialSVGBottom,
  RadialSVGRight,
} from "~/components/RadialSVG";
import { Container } from "~/components/ui/Container";

import { BaseLayout } from "./BaseLayout";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <BaseLayout>
      <div className="pointer-events-none absolute z-0 w-1/4">
        <RadialSVG />
      </div>
      <div className="pointer-events-none absolute right-0 z-0 w-1/3">
        <RadialSVGRight />
      </div>
      <div className="pointer-events-none fixed bottom-0 left-1/2 z-0 w-2/3 -translate-x-1/2">
        <RadialSVGBottom />
      </div>
      <header className="flex h-32 justify-between p-2">
        <div />
        <div></div>
      </header>
      <Container className="relative z-10">{children}</Container>
      <footer className="py-32" />
    </BaseLayout>
  );
};
