import React, { PropsWithChildren } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const PoolDetails = ({ title = "", description = "" }) => (
  <section>
    <h1 className="mb-8 text-4xl font-black uppercase text-black/70 sm:text-5xl">
      {title}
    </h1>
    <div className="prose prose-xl line-clamp-[20]">
      <ReactMarkdown linkTarget={"_blank"} remarkPlugins={[remarkGfm]}>
        {description}
      </ReactMarkdown>
    </div>
    {/* <h3 className="text-xl leading-8">{description}</h3> */}
    <a
      href="#"
      className="invisible font-bold"
      onClick={() => alert("not implemented")}
    >
      Read more
    </a>
  </section>
);
