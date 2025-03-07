import { forwardRef, useRef, useState, ReactNode } from "react";
import ImageBox from "./uiComponents/ImageBox";
import { motion, useInView } from "framer-motion";
import classes from "@/styles/ProjectShowcase.module.css";
import SideModal from "./uiComponents/SideModal";
import Link from "next/link";
import ProjectDetailsEl, {
  projectDetailsType,
} from "./uiComponents/ProjectDetailsEl";
// import bookstoreGif from "@/public/bookstore.gif";
// import bookstoreImage from "@/public/bookstore.png";
import milkTeaStoreGif from "@/public/milktea.gif";
import myWebsiteImage from "@/public/mywebsite.png";
import milkTeaStoreImage from "@/public/milktea_store.png";
import puzzleLocationGameImage from "@/public/questcard.jpg";
import replytTrackImage from "@/public/replytrack.jpg";

// const bookstoreDetails: projectDetailsType = {
//   name: "A Reponsive Bookstore Website DEMO",
//   desc: "Developed a bookstore website using React.js for the frontend.",
//   about: [
//     "Responsive Design: Ensuring a seamless browsing experience across all devices, from desktops to mobile phones using modern CSS practices.",
//     "Custom Styling with SCSS: Leveraging SCSS for styling provided an enhanced level of control over the design, allowing for dynamic variables and mixins that simplify complex styles.",
//   ],
//   img: bookstoreGif,
//   website: "https://bookstore-demo.pages.dev",
//   github: "https://github.com/jackykh/bookstore-demo",
//   techs: ["React", "SCSS", "Firebase Realtime Database"],
// };

const milkTeaStoretoreDetails: projectDetailsType = {
  name: "A Full Stack e-commerce Website Project",
  desc: "Developed a full-stack e-commerce platform using the MERN stack to create a virtual milk tea shop.",
  about: [
    "User Authentication: Implementing registration, login, logout, and role-based access control.",
    "Homepage Effects: Interactive scrolling effects and progress indicators.",
    "E-commerce Functionality: Product purchase, shopping cart management, order tracking, and product/image uploads with previews.",
    "Order Management: User-friendly order history review.",
  ],
  img: milkTeaStoreGif,
  website: "https://milk-tea-8ddb5.web.app/home",
  github: "https://github.com/jackykh/Milk-Tea-Store",
  techs: ["MongoDB", "Express.js", "React", "Node.js", "JWT"],
};

const personalWebsiteDetails: projectDetailsType = {
  name: "Personal Website",
  desc: "Developed a personal website using the Next.js framework",
  about: [
    "Responsive Design: Modern and responsive layout optimized for various devices.",
    "Blog Section: User-friendly blogging platform with SSG and ISR for fast page generation and real-time updates.",
    "AI-Powered Summaries: Integrated Deepseek Chat AI's API to automatically generate concise and informative summaries for blog posts, enhancing reader engagement and content accessibility.",
    "Content Management: Admin panel for managing blog posts, pages, and media using Strapi.",
  ],
  img: myWebsiteImage,
  website: "https://jackycheung.dev/",
  github: "https://github.com/jackykh/personal-website",
  techs: ["Next.js", "Framer Motion", "Strapi", "GraphQL"],
};

const puzzleLocationGameDetails: projectDetailsType = {
  name: "Quest Card",
  desc: "Developed a mobile game using React Native and Firebase Realtime Database, where players solve location-based puzzles.",
  about: [
    "Single Player: Solve location puzzles by guessing on Google Maps or visiting the actual spot.",
    "Multiplayer: Create rooms, set custom puzzles, and compete with others in real-time.",
    "Real-Time Sync: Firebase Realtime Database enables seamless multiplayer interactions.",
    "Custom Puzzles: Players can design and share their own puzzles.",
    "Google Maps API: Integrated for interactive location-based gameplay.",
  ],
  img: puzzleLocationGameImage,
  website: "https://apps.apple.com/hk/app/quest-card/id6740688552",
  techs: [
    "React Native",
    "Firebase Realtime Database",
    "Google Maps API",
    "App Store Deployment",
  ],
};

const replyTrackDetails: projectDetailsType = {
  name: "ReplyTrack",
  desc: "Developed a privacy-first iOS reminder app using React Native, solving 'read-but-forgot-to-reply' scenarios through Share Extension integration and localized data processing.",
  about: [
    "Share Extension Workflow: Allow users to save messages from IM app via iOS Share Extension without data upload",
    "Cross-Language Support: Implemented i18n for Chinese(Trad/Simp)/Japanese/English",
    "Privacy by Design: All message metadata processed locally using MMKV, zero cloud synchronization",
    "Reminders: Notification system considering message urgency and time patterns",
  ],
  img: replytTrackImage,
  website: "https://apps.apple.com/hk/app/replytrack/id6741432172",
  techs: [
    "React Native",
    "iOS Share Extension",
    "i18n-js Localization",
    "MMKV",
    "iOS Notifications",
    "App Store Deployment",
  ],
};
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
        <div className="w-[60rem] max-w-full px-10 pt-[2rem] flex flex-col justify-center items-center text-center mb-16">
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
            img={milkTeaStoreImage}
            caption="A full stack e-commerce Website Project"
            btnOnClick={imageBoxOnClickHandler(milkTeaStoretoreDetails)}
          />
          <ImageBox
            img={myWebsiteImage}
            caption="A Portfolio Website (this website)"
            btnOnClick={imageBoxOnClickHandler(personalWebsiteDetails)}
          />
          <ImageBox
            img={puzzleLocationGameImage}
            caption="Quest Card - An App Game"
            btnOnClick={imageBoxOnClickHandler(puzzleLocationGameDetails)}
          />
          <ImageBox
            img={replytTrackImage}
            caption="ReplyTrack"
            btnOnClick={imageBoxOnClickHandler(replyTrackDetails)}
          />
        </motion.div>

        <div className="flex p-10 justify-center items-center sticky bottom-[2rem] z-10">
          <Link
            href="https://github.com/jackykh"
            target="_blank"
            rel="noopener noreferrer"
          >
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
    </>
  );
});

ProjectShowcase.displayName = "ProjectShowcase";

export default ProjectShowcase;
