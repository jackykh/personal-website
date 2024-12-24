import React, { forwardRef } from "react";
import { Compare } from "@/Components/uiComponents/Compare";
import classes from "@/styles/SectionTwo.module.css";

export const Creativity = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <section
      ref={ref}
      className="w-full px-10 py-6 sm:p-24 min-h-screen bg-green-100 flex gap-10 justify-center items-center flex-col lg:flex-row"
    >
      <div className="w-full text-center lg:text-left lg:w-96 text-green-900">
        <h2 className="text-4xl font-bold mb-4">
          Design Imagination, Build Possibilities
        </h2>
        <p className="text-2xl">
          Turning creative ideas into interactive, user-centered digital
          experiences.
        </p>
      </div>
      <div className="p-4 border rounded-3xl dark:bg-neutral-900 bg-neutral-100  border-neutral-200 dark:border-neutral-800 px-4">
        <Compare
          firstImage="/code.png"
          secondImage="/sectionOne.png"
          firstImageClassName="object-cover object-left-top"
          secondImageClassname="object-cover object-left-top"
          className="h-[24rem] w-[24rem] md:h-[28rem] md:w-[28rem]"
          slideMode="hover"
          autoplay={true}
        />
      </div>
    </section>
  );
});

Creativity.displayName = "Creativity";

export default Creativity;
