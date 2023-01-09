import { forwardRef, useRef } from "react";
import ImageBox from "./uiComponents/ImageBox";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import classes from "../styles/SectionThree.module.css";

const SectionThree = forwardRef<HTMLElement>((_props, ref) => {
  const workListRef = useRef(null);
  const isInView = useInView(workListRef, { once: true });

  const container = {
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section ref={ref} className={classes.sectionThreeBg}>
      <div className="w-[60rem] max-w-full px-10 pt-[2rem] flex flex-col justify-center items-center text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">My Side Project</h1>
        <p className="text-xl">
          Here are some side projects I&apos;ve worked on recently.
        </p>
      </div>
      <motion.div
        className="px-6 lg:px-16 md:px-10 w-full grid grid-cols-autofit-20 grid-rows-1 gap-6 "
        initial={false}
        ref={workListRef}
        variants={container}
        animate={isInView ? "visible" : "hidden"}
      >
        <ImageBox
          img="/bookstore.png"
          caption="A responsive Book Store website"
          link="https://jackiecheunq.github.io/Bookstore/"
        />
        <ImageBox
          img="/milktea_store.png"
          caption="A full stack Products Showcase Website Project"
          link="https://milk-tea-8ddb5.web.app/"
        />
        <ImageBox
          img="/personalwebsite.png"
          caption="A Portfolio Website (this website)"
          link="https://jackycheung.dev/"
        />
      </motion.div>

      <div className="flex p-10 justify-center items-center sticky bottom-[2rem] z-10">
        <Link href="https://github.com/jackiecheunq">
          <motion.button
            className="btn text-base shadow-md shadow-zinc-400 overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 1,
              ease: "linear",
            }}
            viewport={{ once: true }}
          >
            See More on My Github
          </motion.button>
        </Link>
      </div>
    </section>
  );
});

SectionThree.displayName = "SectionThree";

export default SectionThree;
