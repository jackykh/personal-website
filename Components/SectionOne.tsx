import classes from "../styles/SectionOne.module.css";
import Image from "next/image";
import { forwardRef } from "react";

const SectionOne = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <section className={classes.sectionOneBg} ref={ref}>
      <div className="w-full sm:w-[70%] flex flex-col p-20 items-center">
        <div className="w-full flex justify-center mb-8">
          <div className="w-[50rem] ">
            <h1 className="text-transparent text-6xl font-bold bg-gradient-to-r from-[#00FFAB]  to-[#E3FCBF] bg-clip-text inline">
              Frontend <br />
              Developer.
            </h1>
            <h3 className="text-3xl text-[#c1deae] mt-6 pr-10">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Provident voluptatum
            </h3>
          </div>
        </div>
        <div className="flex w-[50rem] max-w-full  [&>*]:mr-6 text-[#c1deae]">
          <h3>
            Lorem ipsum dolor, sit amet consectetur, <br />
            dolore, officiis rem cumque autem est.
          </h3>
          <h3>
            Lorem ipsum dolor, sit amet consectetur, <br />
            dolore, officiis rem cumque autem est.å
          </h3>
        </div>
      </div>
      <div className="sm:w-[30%]">
        <div className="w-[15rem] h-[15rem]">
          <Image
            className="sm:ml-[-45%]  w-full"
            src="/149071.png"
            alt="Icon"
            width={200}
            height={200}
          />
        </div>
      </div>
    </section>
  );
});

SectionOne.displayName = "SectionOne";

export default SectionOne;
