import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
import {
  RadialSVG,
  RadialSVGBottom,
  RadialSVGRight,
} from "~/components/RadialSVG";
import { Container } from "~/components/ui/Container";
import { BaseLayout } from "./BaseLayout";
import { GG19 } from "~/components/ui/GG19";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <BaseLayout>
      <div className="pointer-events-none absolute left-0 right-0 top-0 bottom-0 bg-center z-0 ">
        <GG19 />
      </div>
     
      <header className="flex h-32 justify-between p-2">
        <div />
        <div>
          <ConnectButton />
        </div>
      </header>
      <Container className="relative z-10">{children}</Container>
      <footer className="py-32" />
    </BaseLayout>
  );
};
