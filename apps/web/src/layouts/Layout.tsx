import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
import ConnectWalletButton from "~/components/ConnectWalletButton";
import { RadialSVG } from "~/components/RadialSVG";
import { Container } from "~/components/ui/Container";

import { BaseLayout } from "./BaseLayout";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <BaseLayout>
      <div className="absolute z-0 w-1/4">
        <RadialSVG />
      </div>
      <header className="flex h-32 justify-between p-2">
        <div />
        <div>
          <ConnectWalletButton />
        </div>
      </header>
      <Container className="relative z-10">{children}</Container>
      <footer className="py-32" />
    </BaseLayout>
  );
};
