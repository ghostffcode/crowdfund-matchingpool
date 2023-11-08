import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
import {
  RadialSVG,
  RadialSVGBottom,
  RadialSVGRight,
} from "~/components/RadialSVG";
import { Container } from "~/components/ui/Container";

import { BaseLayout } from "./BaseLayout";
import Image from "next/image";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <BaseLayout>
      <div className="pointer-events-none absolute bg-center z-0 ">
        <Image src="/G1.svg" className="opacity-10 overflow-hidden" alt=""/>
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
