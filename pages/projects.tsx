import Head from "next/head";
import Navigation from "@/Components/uiComponents/Navigation";
import Footer from "@/Components/Footer";
import SideModal from "@/Components/uiComponents/SideModal";
import { useState } from "react";
import type { ReactNode } from "react";
import ProjectDetailsEl from "@/Components/uiComponents/ProjectDetailsEl";
import ImageBox from "@/Components/uiComponents/ImageBox";
import resignationCalculatorImage from "@/public/resigncal.png";
import {
  projectDetailsType,
  personalWebsiteDetails,
  resignationCalculatorDetails,
  doraSearchDetails,
  PastScanDetails
} from "@/utils/projects";

const ProjectList = () => {
  const [sideModalContent, setSideModalContent] = useState<ReactNode>(null);

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
      <Head>
        <title>Projects - Jacky&apos;s Website</title>
        <meta name="description" content="Projects - Jacky's Website" />
      </Head>
      <Navigation />
      <SideModal
        isShown={sideModalContent ? true : false}
        content={sideModalContent}
        setContent={setSideModalContent}
      />
      <main className="pt-32 pb-24 px-6 sm:px-10 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-5xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted mb-6">
            Works
          </p>
          <h1 className="font-display font-medium uppercase tracking-[-0.02em] leading-none text-[clamp(2.5rem,6vw,4.5rem)] text-ink mb-14">
            Side Projects
          </h1>
        </div>
        <div className="w-full max-w-5xl grid sm:grid-cols-2 gap-x-10 gap-y-16">
          <ImageBox
            index="01"
            img={personalWebsiteDetails.img}
            caption="A Portfolio Website (this website)"
            btnOnClick={imageBoxOnClickHandler(personalWebsiteDetails)}
          />
          <div className="sm:mt-24">
            <ImageBox
              index="02"
              img={PastScanDetails.img}
              caption="PastScan - Document OCR & Search Platform for Researchers"
              btnOnClick={imageBoxOnClickHandler(PastScanDetails)}
            />
          </div>
          <ImageBox
            index="03"
            img={doraSearchDetails.img}
            caption="DoraSearch - Doraemon Manga Full-Text Search"
            btnOnClick={imageBoxOnClickHandler(doraSearchDetails)}
          />
          <div className="sm:mt-24">
            <ImageBox
              index="04"
              img={resignationCalculatorImage}
              caption="Resignation Date Calculator"
              btnOnClick={imageBoxOnClickHandler(resignationCalculatorDetails)}
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectList;
