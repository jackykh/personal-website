import { useEffect, useRef, useState, useCallback } from "react";
import Hero from "@/Components/Hero";
import Intro from "@/Components/Intro";
import ProjectShowcase from "@/Components/ProjectShowcase";
import ContactSection from "@/Components/ContactSection";
import Footer from "@/Components/Footer";
import Navigation from "@/Components/uiComponents/Navigation";
import SectionNav from "@/Components/uiComponents/SectionNav";
import useMediaQuery from "@/hooks/useMediaQuery";
import useEffectDebugger from "@/hooks/useEffectDebugger";
import Creativity from "@/Components/Creativity";
import Head from "next/head";
import type { IntRange } from "@/utils/types";

// Enum of Section Number Range.
// It should be updated when total section number is changed.
type sectionRange = IntRange<0, 6>;

export default function Home() {
  const sectionsListRef = useRef<HTMLElement[] | null>(null);

  const getSectionList = () => {
    if (!sectionsListRef.current) {
      // Initialize the Array on first usage.
      sectionsListRef.current = [];
    }
    return sectionsListRef.current;
  };

  const attachNodeToRef = (node: HTMLElement) => {
    const sectionList = getSectionList();
    if (node && !sectionList.includes(node)) {
      sectionList.push(node);
    }
  };

  const sectionBgWithDarkColor: Array<sectionRange> = [5];

  const [currentSection, setCurrentSection] = useState(0);

  const [showSectionNav, setSectionNav] = useState(false);

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const isSmallScreen = useMediaQuery("(min-width: 640px)");

  const lastTimeRef = useRef<number>(0);

  const goToNextSection = useCallback(() => {
    /// The Length of sectionRefList
    const lengthOfSections = getSectionList().length;
    setCurrentSection((prevState) => {
      if (prevState < lengthOfSections - 1) {
        return prevState + 1;
      } else {
        return prevState;
      }
    });
  }, []);

  const goToPrevSection = useCallback(() => {
    setCurrentSection((prevState) => {
      if (prevState > 0) {
        return prevState - 1;
      } else {
        return prevState;
      }
    });
  }, []);

  //// HANDLE WHEEL EVENT
  const sectionWheelHandler = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();
      const currentTime = Date.now();
      const animationBreak = 1800;
      const notRapidSuccession =
        currentTime > lastTimeRef.current + animationBreak;
      if (notRapidSuccession) {
        if (event.deltaY < 0) {
          goToPrevSection();
        } else if (event.deltaY >= 0) {
          goToNextSection();
        }
        lastTimeRef.current = currentTime;
      }
    },
    [goToPrevSection, goToNextSection]
  );

  /// HANDLE UP ARROW AND DOWN ARROW EVENT
  const isKeyHandled = useRef<boolean>(false);

  const sectionKeyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      if (!(event.key === "ArrowUp" || event.key === "ArrowDown")) return;
      event.preventDefault();
      if (!isKeyHandled.current) {
        if (event.key === "ArrowUp") {
          // up arrow
          goToPrevSection();
        } else if (event.key === "ArrowDown") {
          // down arrow
          goToNextSection();
        }
        isKeyHandled.current = true;
      }
    },
    [goToPrevSection, goToNextSection]
  );

  const sectionKeyUpHandler = useCallback((event: KeyboardEvent) => {
    if (isKeyHandled.current) {
      if (event.key == "ArrowUp" || event.key == "ArrowDown") {
        isKeyHandled.current = false;
      }
    }
  }, []);

  //// HANDLE TOUCH EVENT
  const touchY = useRef<number>(0);
  const touchstartHandler = useCallback((event: TouchEvent) => {
    touchY.current = event.touches[0].clientY;
  }, []);
  const touchMoveHandler = useCallback((event: TouchEvent) => {
    event.preventDefault();
  }, []);
  const touchEndHandler = useCallback(
    (event: TouchEvent) => {
      const curTouchY = event.changedTouches[0].clientY;
      if (touchY.current > curTouchY) {
        goToNextSection();
      } else {
        goToPrevSection();
      }
    },
    [goToNextSection, goToPrevSection]
  );

  useEffect(() => {
    if (isLargeScreen) {
      document.addEventListener("wheel", sectionWheelHandler, {
        passive: false,
      });
      document.addEventListener("touchstart", touchstartHandler);
      document.addEventListener("touchmove", touchMoveHandler, {
        passive: false,
      });
      document.addEventListener("touchend", touchEndHandler);
      document.addEventListener("keydown", sectionKeyDownHandler);
      document.addEventListener("keyup", sectionKeyUpHandler);
      setSectionNav(true);
    }

    return () => {
      document.removeEventListener("wheel", sectionWheelHandler);
      document.removeEventListener("touchstart", touchstartHandler);
      document.removeEventListener("touchmove", touchMoveHandler);
      document.removeEventListener("touchend", touchEndHandler);
      document.removeEventListener("keydown", sectionKeyDownHandler);
      document.removeEventListener("keyup", sectionKeyUpHandler);
      setSectionNav(false);
    };
  }, [
    isLargeScreen,
    sectionWheelHandler,
    sectionKeyDownHandler,
    sectionKeyUpHandler,
    touchstartHandler,
    touchMoveHandler,
    touchEndHandler,
  ]);

  useEffectDebugger(
    (changedDeps: {
      [keyName: string]: {
        before: any;
        after: any;
      };
    }) => {
      const isScreenChange = changedDeps.isLargeScreen;
      const currentSectionRef = getSectionList()[currentSection];
      const scrollOption: ScrollIntoViewOptions = isScreenChange
        ? { behavior: "auto" }
        : { behavior: "smooth" };
      if (isLargeScreen && currentSectionRef) {
        setTimeout(() => currentSectionRef.scrollIntoView(scrollOption), 100);
      }
    },
    [isLargeScreen, currentSection],
    ["isLargeScreen", "currentSection"]
  );

  const JsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jacky Cheung | Web Developer",
    alternateName: [
      "Jacky Portfolio | Blog | Resume",
      "JC's Website | Web Developer",
    ],
    url: "https://jackycheung.dev",
  };
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JsonLd) }}
          key="jsonld"
        />
      </Head>
      <main className="w-full scroll-container">
        <Navigation
          fixed={isLargeScreen}
          isBgDark={
            !isSmallScreen ||
            sectionBgWithDarkColor.includes(currentSection as sectionRange)
          }
        />
        <Hero ref={attachNodeToRef} />
        <Intro ref={attachNodeToRef} />
        <Creativity ref={attachNodeToRef} />
        <ProjectShowcase ref={attachNodeToRef} />
        <ContactSection ref={attachNodeToRef} />
        <Footer ref={attachNodeToRef} fullScreen={true} />
        {showSectionNav && (
          <SectionNav
            currentSection={currentSection}
            sectionNumber={getSectionList().length}
            setCurrentSection={setCurrentSection}
            sectionBgWithDarkColor={sectionBgWithDarkColor}
          />
        )}
      </main>
    </>
  );
}
