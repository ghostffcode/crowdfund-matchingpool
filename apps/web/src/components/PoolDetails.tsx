import React, { PropsWithChildren, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PPMori, pt_serif } from "~/pages/_app";

export const PoolDetails = ({ title = "", description = "" }) => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const canShowMore = description.length > 140

  return (
    <section>
      <h1 className={`${PPMori.className} mb-8 text-4xl font-[500] uppercase text-black sm:text-5xl`}>
        {title}
      </h1>
      <div className={`${pt_serif.className} prose line-clamp-[20] text-justify`}>
        <ReactMarkdown linkTarget={"_blank"} remarkPlugins={[remarkGfm]}>
          {canShowMore && !showMore ? `${description.slice(0, 140)}... ` : description}
        </ReactMarkdown>
      </div>
      {/* <h3 className="text-xl leading-8">{description}</h3> */}
      {canShowMore && <a
        href="#"
        className="font-[500]"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show less" : "Read more"}
      </a>}
    </section>
  )
};
