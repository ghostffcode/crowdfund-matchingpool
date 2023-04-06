import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PropsWithChildren } from "react";
import { Container } from "~/components/ui/Container";

import { BaseLayout } from "./BaseLayout";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <BaseLayout>
      <header className="flex justify-between p-2">
        <div />
        <ConnectButton />
      </header>
      <Container>{children}</Container>
    </BaseLayout>
  );
};
