import React from "react";
import Reveal from "./uiComponents/Reveal";

const skills = [
  {
    index: "01",
    name: "React",
    items: ["TypeScript React", "Framer Motion", "Next.js", "React Native"],
  },
  {
    index: "02",
    name: "Node.js",
    items: ["Express.js", "SQL", "MongoDB", "GraphQL"],
  },
  {
    index: "03",
    name: "CSS",
    items: ["SASS", "Tailwind CSS", "FlexBox", "Grid"],
  },
];

const Intro = () => {
  return (
    <section className="w-full border-b border-line">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-28 sm:py-36 grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-4">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted lg:sticky lg:top-32">
            01 — About
          </p>
        </div>
        <div className="lg:col-span-8">
          <Reveal>
            <p className="font-serif text-3xl sm:text-5xl leading-[1.15] text-ink">
              I’m Jacky — a{" "}
              <span className="italic">self-taught</span> frontend developer
              based in Hong Kong. After graduating with a history degree in
              2021, I threw all my energy into building for the web.
            </p>
          </Reveal>
          <div className="mt-20 sm:mt-28">
            {skills.map((skill, i) => (
              <Reveal key={skill.name} delay={i * 0.08}>
                <div className="group border-t border-line last:border-b py-6 sm:py-8 grid sm:grid-cols-12 gap-2 sm:gap-4 items-baseline px-3 -mx-3 hover:bg-white transition-colors duration-300">
                  <span className="font-mono text-xs text-muted sm:col-span-1">
                    {skill.index}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-ink sm:col-span-4">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-muted sm:col-span-7 sm:text-right">
                    {skill.items.join(" / ")}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
