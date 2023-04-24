import React, { PropsWithChildren, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const PoolDetails = ({ title = "", description = "" }) => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const canShowMore = description.length > 140

  return (
    <section>
      <h1 className="mb-8 text-4xl font-black uppercase text-black/70 sm:text-5xl">
        {title}
      </h1>
      <div className="prose prose-xl line-clamp-[20]">
        <ReactMarkdown linkTarget={"_blank"} remarkPlugins={[remarkGfm]}>
          {canShowMore && !showMore ? `${description.slice(0, 140)}... ` : description}
        </ReactMarkdown>
      </div>
      {/* <h3 className="text-xl leading-8">{description}</h3> */}
      {canShowMore && <a
        href="#"
        className="font-bold"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show less" : "Read more"}
      </a>}
    </section>
  )
};
