import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
} from "@radix-ui/react-dialog";
import { PropsWithChildren, ReactNode } from "react";

export const Dialog = ({
  title = "",
  description = "",
  trigger,
  children,
}: {
  title?: string;
  description?: string;
  trigger: ReactNode;
} & PropsWithChildren) => (
  <Root>
    <Trigger asChild>{trigger}</Trigger>
    <Portal>
      <Overlay className="fixed inset-0 bg-black/30" />
      <Content className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 bg-white shadow-xl">
        <Title className="bg-gradient-to-r from-[#B2DAD5] to-[#FEEFBE] py-8 text-center text-2xl">
          {title}
        </Title>
        <Description className="">{description}</Description>
        {children}
      </Content>
    </Portal>
  </Root>
);
