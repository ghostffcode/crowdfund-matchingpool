import "@rainbow-me/rainbowkit/styles.css";
import "~/styles/globals.css";

import { Inter, DM_Mono, PT_Serif } from "next/font/google";

import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { api } from "~/utils/api";
import { WalletProvider } from "~/providers/WalletProvider";

const inter = Inter({ subsets: ["latin"] });

export const dm_mono = DM_Mono({weight: '400', subsets: ['latin']});

export const pt_serif = PT_Serif({weight: '400', subsets: ['latin']});


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <WalletProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </WalletProvider>
  );
};

export default api.withTRPC(MyApp);
