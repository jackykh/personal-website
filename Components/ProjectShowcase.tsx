import { useState, ReactNode } from "react";
import Image from "next/image";
import SideModal from "./uiComponents/SideModal";
import Link from "next/link";
import Reveal from "./uiComponents/Reveal";
import ProjectDetailsEl from "./uiComponents/ProjectDetailsEl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
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

  const openDetails = (projectDetails: projectDetailsType) => {
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
                All projects <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </Reveal>

          <div>
            {projects.map((project, i) => (
              <Reveal key={project.name} delay={i * 0.06}>
                <button
                  onClick={openDetails(project)}
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
                    <FontAwesomeIcon icon={faArrowUp} className="rotate-45" />
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
      </section>
    </>
  );
};

export default ProjectShowcase;
