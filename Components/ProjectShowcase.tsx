import { forwardRef, useRef, useState, ReactNode } from "react";
import ImageBox from "./uiComponents/ImageBox";
import { motion, useInView } from "framer-motion";
import classes from "@/styles/ProjectShowcase.module.css";
import SideModal from "./uiComponents/SideModal";
import Link from "next/link";
import ProjectDetailsEl from "./uiComponents/ProjectDetailsEl";
import {
  projectDetailsType,
  personalWebsiteDetails,
  puzzleLocationGameDetails,
  doraSearchDetails,
} from "@/utils/projects";

const ProjectShowcase = forwardRef<HTMLElement>((_props, ref) => {
  const workListRef = useRef(null);
  const isInView = useInView(workListRef, { once: true });
  const [sideModalContent, setSideModalContent] = useState<ReactNode>(null);

  const container = {
    visible: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const imageBoxOnClickHandler = (projectDetails: projectDetailsType) => {
    return () => {
      const { name } = projectDetails;
      setSideModalContent(<ProjectDetailsEl detail={projectDetails} />);
      if (umami) {
        umami.track("Check My Project", { projectName: name });
      }
    };
  };

  return (
    <>
      <SideModal
        isShown={sideModalContent ? true : false}
        content={sideModalContent}
        setContent={setSideModalContent}
      />
      <section ref={ref} className={classes.background}>
        <div className="w-[60rem] max-w-full px-10 flex flex-col justify-center items-center text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">My Side Project</h2>
          <p className="text-xl">
            Here are some side projects I&apos;ve worked on recently.
          </p>
        </div>
        <motion.div
          className="px-6 lg:px-16 md:px-10 w-full grid grid-cols-autofit-20 grid-rows-1 gap-6 "
          initial={false}
          transition={{ duration: 0.4 }}
          ref={workListRef}
          variants={container}
          animate={isInView ? "visible" : "hidden"}
        >
          <ImageBox
            img={personalWebsiteDetails.img}
            caption="A Portfolio Website (this website)"
            btnOnClick={imageBoxOnClickHandler(personalWebsiteDetails)}
          />
          <ImageBox
            img={doraSearchDetails.img}
            caption="DoraSearch - Doraemon Manga Full-Text Search"
            btnOnClick={imageBoxOnClickHandler(doraSearchDetails)}
          />
          <ImageBox
            img={puzzleLocationGameDetails.img}
            caption="Quest Card - An App Game"
            btnOnClick={imageBoxOnClickHandler(puzzleLocationGameDetails)}
          />
        </motion.div>

        <div className="flex p-10 justify-center items-center sticky bottom-[2rem] z-10">
          <Link href="/projects">
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
              See More Projects
            </motion.button>
          </Link>
        </div>
      </section>
    </>
  );
});

ProjectShowcase.displayName = "ProjectShowcase";

export default ProjectShowcase;
