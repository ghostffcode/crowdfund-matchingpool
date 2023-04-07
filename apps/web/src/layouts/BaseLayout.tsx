import { PropsWithChildren } from "react";
import { NextSeo } from "next-seo";

import site from "~/config/site";

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextSeo title={site.title} description={site.description} />
      <main className="mx-auto min-h-screen bg-[#FFE767] text-gray-700">
        <div className="">{children}</div>
      </main>
    </>
  );
};
