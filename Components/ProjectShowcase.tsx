import { useRef, useState, ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import SideModal from "./uiComponents/SideModal";
import Link from "next/link";
import Reveal from "./uiComponents/Reveal";
import ProjectDetailsEl from "./uiComponents/ProjectDetailsEl";
import {
  projectDetailsType,
  personalWebsiteDetails,
  PastScanDetails,
  doraSearchDetails,
  resignationCalculatorDetails,
} from "@/utils/projects";

const projects = [
  personalWebsiteDetails,
  PastScanDetails,
  doraSearchDetails,
  resignationCalculatorDetails,
];

const ProjectShowcase = () => {
  const [sideModalContent, setSideModalContent] = useState<ReactNode>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const lastActiveRef = useRef(0);
  if (activeIndex !== null) lastActiveRef.current = activeIndex;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 28, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 250, damping: 28, mass: 0.6 });

  const openDetails = (projectDetails: projectDetailsType) => {
    return () => {
      const { name } = projectDetails;
      setSideModalContent(<ProjectDetailsEl detail={projectDetails} />);
      if (umami) {
        umami.track("Check My Project", { projectName: name });
      }
    };
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  return (
    <>
      <SideModal
        isShown={sideModalContent ? true : false}
        content={sideModalContent}
        setContent={setSideModalContent}
      />
      <section className="w-full border-b border-line">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-28 sm:py-36">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-14">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted mb-8">
                  02 — Works
                </p>
                <h2 className="font-display font-medium uppercase leading-[0.95] tracking-[-0.02em] text-[clamp(2.6rem,6.5vw,5.5rem)] text-ink">
                  Selected{" "}
                  <span className="font-serif italic font-normal normal-case">
                    works
                  </span>
                </h2>
              </div>
              <Link
                href="/projects"
                className="font-mono text-xs uppercase tracking-[0.2em] text-soft border-b border-line pb-1 hover:text-ink hover:border-ink transition-colors"
              >
                All projects →
              </Link>
            </div>
          </Reveal>

          <div onMouseMove={onMouseMove} onMouseLeave={() => setActiveIndex(null)}>
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={i * 0.06}>
                <button
                  onClick={openDetails(project)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className="group w-full text-left border-t border-line last:border-b py-7 sm:py-9 px-3 -mx-3 sm:px-5 sm:-mx-5 grid grid-cols-12 gap-3 sm:gap-4 items-baseline hover:bg-white transition-colors duration-300 cursor-pointer"
                >
                  <span className="col-span-2 sm:col-span-1 font-mono text-xs text-muted">
                    0{i + 1}
                  </span>
                  <span className="col-span-9 sm:col-span-6 font-display font-medium text-2xl sm:text-4xl lg:text-[2.75rem] text-ink leading-tight transition-transform duration-300 group-hover:translate-x-2">
                    {project.name}
                  </span>
                  <span className="hidden md:block col-span-4 font-mono text-[11px] uppercase tracking-[0.15em] text-muted text-right">
                    {project.techs.slice(0, 3).join(" / ")}
                  </span>
                  <span className="col-span-1 text-right text-muted group-hover:text-ink transition-colors">
                    ↗
                  </span>
                  <span className="col-span-full sm:hidden block mt-4">
                    <Image
                      src={project.img}
                      alt={project.name}
                      className="w-full aspect-[16/9] object-cover object-top border border-line"
                      {...(project.img.src.endsWith(".gif")
                        ? {}
                        : { placeholder: "blur" as const })}
                    />
                  </span>
                </button>
              </Reveal>
            ))}
          </div>
        </div>

        <motion.div
          className="pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
          style={{ x: springX, y: springY }}
          initial={false}
          animate={{
            opacity: activeIndex !== null ? 1 : 0,
            scale: activeIndex !== null ? 1 : 0.9,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2 w-[24rem]">
            <Image
              src={projects[lastActiveRef.current].img}
              alt=""
              className="w-full aspect-[4/3] object-cover object-top border border-line bg-white shadow-[0_24px_60px_rgba(27,26,23,0.18)]"
              {...(projects[lastActiveRef.current].img.src.endsWith(".gif")
                ? {}
                : { placeholder: "blur" as const })}
            />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default ProjectShowcase;
