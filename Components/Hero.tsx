import classes from "@/styles/Hero.module.css";
import Image from "next/image";
import { forwardRef } from "react";
import memoji from "@/public/memoji_Icon.png";

const Hero = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <section className={classes.HeroBg} ref={ref}>
      <div className="w-full sm:w-[70%] flex flex-col p-20 items-center">
        <div className="w-full flex justify-center mb-8">
          <div className="w-[50rem] ">
            <h1 className="text-transparent text-6xl font-bold bg-gradient-to-r from-[#00FFAB]  to-[#E3FCBF] bg-clip-text inline">
              Frontend Web <br />
              Developer.
            </h1>
            <h3 className="text-3xl text-[#c1deae] mt-6 pr-10">
              I love building beautiful website and learning frontend
              engineering.
            </h3>
          </div>
        </div>
        <div className="flex w-[50rem] max-w-full  [&>*]:mr-6 text-[#c1deae]">
          <h3>
            Proficient in using popular
            <br />
            frontend tech stacks.
          </h3>
          <h3>
            Strong Problem Solving Skill <br />
            obtained in the process of self study.
          </h3>
        </div>
      </div>
      <div className="sm:w-[30%]">
        <div className="sm:ml-[-25%] w-[15rem] h-[15rem] bg-purple-100 rounded-full overflow-hidden ">
          <Image className="w-full" src={memoji} alt="Icon" />
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";

export default Hero;
