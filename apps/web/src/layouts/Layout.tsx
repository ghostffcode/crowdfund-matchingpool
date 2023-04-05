import { PropsWithChildren } from "react";
import { Container } from "~/components/ui/Container";

import { BaseLayout } from "./BaseLayout";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <BaseLayout>
      <header className="p-6"></header>
      <Container>{children}</Container>
    </BaseLayout>
  );
};
