import "@rainbow-me/rainbowkit/styles.css";
import "~/styles/globals.css";

import { DM_Mono, PT_Serif } from "next/font/google";
import localFont from 'next/font/local'
import { type AppType } from "next/app";
import { type Session } from "next-auth";

import { api } from "~/utils/api";
import { WalletProvider } from "~/providers/WalletProvider";

const pp_mori = localFont({ 
  src:
    [ {
        path: '/fonts/PPMori-Regular.otf',
    },
    {
        path: '/fonts/PPMori-SemiBold.otf',
    }    
  ],
  variable: "--font-pp-mori"
});

const dm_mono = DM_Mono({weight: '400', subsets: ['latin'], variable: '--font-dm-mono'});

const pt_serif = PT_Serif({weight: '400', subsets: ['latin'], variable: '--font-pt-serif'});


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <WalletProvider>
      <main className={`${pt_serif.variable} ${dm_mono.variable} ${pp_mori.variable}`}>
        <Component {...pageProps} />
      </main>
    </WalletProvider>
  );
};

export default api.withTRPC(MyApp);
