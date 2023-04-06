import "@rainbow-me/rainbowkit/styles.css";
import "~/styles/globals.css";

import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { api } from "~/utils/api";
import { WalletProvider } from "~/providers/WalletProvider";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <WalletProvider>
      <Component {...pageProps} />
    </WalletProvider>
  );
};

export default api.withTRPC(MyApp);
