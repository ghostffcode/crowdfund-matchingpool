import { Button } from "~/components/ui/Button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { PropsWithChildren, useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

export const ConnectWalletButton = ({
  label = "Connect Wallet",
  children,
}: { label?: string } & PropsWithChildren) => {
  const { isConnected } = useAccount();
  const { connect, connectors, isLoading, ...rest } = useConnect();

  // Auto-connect burner wallet
  useEffect(() => {
    // !isLoading && !isConnected && connect({ connector: connectors[0] });
  }, []);

  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal, mounted }) => {
        if (!mounted) return null;
        if (isLoading) return <pre>connecting wallet...</pre>;
        if (account) return children;
        return (
          <Button color="primary" className="w-full" onClick={openConnectModal}>
            {label}
          </Button>
        );
      }}
    </ConnectButton.Custom>
  );
};
export default ConnectWalletButton;
