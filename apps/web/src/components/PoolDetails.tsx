import React, { PropsWithChildren, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Heading } from "./ui/Heading";

export const PoolDetails = ({ title = "", description = "" }) => {
  const [showMore, setShowMore] = useState<boolean>(false)

  const canShowMore = description.length > 140

  return (
    <section>
      <Heading className="mb-8 text-4xl sm:text-5xl uppercase">
        {title}
      </Heading>
      <div className="prose line-clamp-[20] text-justify">
        <ReactMarkdown linkTarget={"_blank"} remarkPlugins={[remarkGfm]}>
          {canShowMore && !showMore ? `${description.slice(0, 140)}... ` : description}
        </ReactMarkdown>
      </div>
      {/* <h3 className="text-xl leading-8">{description}</h3> */}
      {canShowMore && <a
        href="#"
        className="font-medium"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Show less" : "Read more"}
      </a>}
    </section>
  )
};
