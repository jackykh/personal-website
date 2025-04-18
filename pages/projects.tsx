import Head from "next/head";
import Navigation from "@/Components/uiComponents/Navigation";
import Footer from "@/Components/Footer";
import classes from "@/styles/Category.module.css";
import SideModal from "@/Components/uiComponents/SideModal";
import { useState } from "react";
import type { ReactNode } from "react";
import ProjectDetailsEl from "@/Components/uiComponents/ProjectDetailsEl";
import ImageBox from "@/Components/uiComponents/ImageBox";
import milkTeaStoreImage from "@/public/milktea_store.png";
import bookStoreImage from "@/public/bookstore.png";
import resignationCalculatorImage from "@/public/resigncal.png";
import {
  projectDetailsType,
  milkTeaStoretoreDetails,
  personalWebsiteDetails,
  puzzleLocationGameDetails,
  replyTrackDetails,
  bookstoreDetails,
  resignationCalculatorDetails,
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
      <main
        className={`py-24 px-8 flex flex-col items-center ${classes.bgGrid}`}
      >
        <h1 className="text-4xl pb-4 mb-8 font-bold">Side Projects.</h1>
        <div className="p-4 w-full max-w-4xl grid grid-cols-autofit-20 grid-rows-1 gap-6 ">
          <ImageBox
            img={personalWebsiteDetails.img}
            caption="A Portfolio Website (this website)"
            btnOnClick={imageBoxOnClickHandler(personalWebsiteDetails)}
          />
          <ImageBox
            img={resignationCalculatorImage}
            caption="Resignation Date Calculator"
            btnOnClick={imageBoxOnClickHandler(resignationCalculatorDetails)}
          />
          <ImageBox
            img={puzzleLocationGameDetails.img}
            caption="Quest Card - An App Game"
            btnOnClick={imageBoxOnClickHandler(puzzleLocationGameDetails)}
          />
          <ImageBox
            img={replyTrackDetails.img}
            caption="ReplyTrack"
            btnOnClick={imageBoxOnClickHandler(replyTrackDetails)}
          />
          <ImageBox
            img={milkTeaStoreImage}
            caption="A full stack e-commerce Website Project"
            btnOnClick={imageBoxOnClickHandler(milkTeaStoretoreDetails)}
          />
          <ImageBox
            img={bookStoreImage}
            caption="A Reponsive Bookstore Website DEMO"
            btnOnClick={imageBoxOnClickHandler(bookstoreDetails)}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProjectList;
