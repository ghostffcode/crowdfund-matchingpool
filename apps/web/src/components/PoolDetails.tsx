export const PoolDetails = ({ title = "", description = "" }) => (
  <section>
    <h1 className="mb-8 text-4xl font-black uppercase text-black/70 sm:text-5xl">
      {title}
    </h1>
    <h3 className="text-xl leading-8">{description}</h3>
    <a
      href="#"
      className="invisible font-bold"
      onClick={() => alert("not implemented")}
    >
      Read more
    </a>
  </section>
);
