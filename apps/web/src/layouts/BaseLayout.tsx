import { PropsWithChildren } from "react";
import { NextSeo } from "next-seo";

import site from "~/config/site";

const { title, description, url, twitter } = site;
export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url,
          title,
          description,
          siteName: title,
        }}
        twitter={{
          handle: twitter,
          site: twitter,
          cardType: "summary_large_image",
        }}
      />
      <main className="mx-auto min-h-screen bg-[#FFE767] text-gray-700">
        <div className="">{children}</div>
      </main>
    </>
  );
};
