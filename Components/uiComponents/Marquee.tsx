const items = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Node.js",
  "GraphQL",
  "React Native",
];

const Marquee = () => {
  const row = (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center shrink-0">
          <span className="font-serif italic text-2xl sm:text-3xl text-ink">
            {item}
          </span>
          <span className="mx-8 font-mono text-xs text-muted">✳</span>
        </span>
      ))}
    </>
  );

  return (
    <div className="w-full overflow-hidden border-b border-line py-5">
      <div className="flex w-max animate-marquee">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0" aria-hidden="true">
          {row}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
