import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import SectionOne from "@/Components/SectionOne";
import SectionTwo from "@/Components/SectionTwo";
import SectionThree from "@/Components/SectionThree";
import SectionFour from "@/Components/SectionFour";
import Footer from "@/Components/Footer";
import Navigation from "@/Components/uiComponents/Navigation";
import SectionNav from "@/Components/uiComponents/SectionNav";
import useMediaQuery from "@/hooks/useMediaQuery";
import useEffectDebugger from "@/hooks/useEffectDebugger";

export default function Home() {
  const sectionOneRef = useRef(null);
  const sectionTwoRef = useRef(null);
  const sectionThreeRef = useRef(null);
  const sectionFourRef = useRef(null);
  const footerRef = useRef(null);

  const sectionRefList = useMemo(
    () => [
      sectionOneRef,
      sectionTwoRef,
      sectionThreeRef,
      sectionFourRef,
      footerRef,
    ],
    []
  );
  const sectionBgWithDarkColor = [4];

  const [currentSection, setCurrentSection] = useState(0);

  const [showSectionNav, setSectionNav] = useState(false);

  const isLargeScreen = useMediaQuery("(min-width: 1024px)");

  const isSmallScreen = useMediaQuery("(min-width: 640px)");

  const lastTimeRef = useRef<number>(0);

  const goToNextSection = useCallback(() => {
    /// The Length of sectionRefList
    const sectionRefNumber = sectionRefList.length;
    setCurrentSection((prevState) => {
      if (prevState < sectionRefNumber - 1) {
        return prevState + 1;
      } else {
        return prevState;
      }
    });
  }, [sectionRefList]);

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
      /// The Length of sectionRefList
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
      const scrollOption: ScrollIntoViewOptions = isScreenChange
        ? { behavior: "auto" }
        : { behavior: "smooth" };
      if (isLargeScreen && sectionRefList[currentSection].current) {
        setTimeout(
          () =>
            (
              sectionRefList[currentSection].current! as HTMLElement
            ).scrollIntoView(scrollOption),
          100
        );
      }
    },
    [isLargeScreen, currentSection, sectionRefList],
    ["isLargeScreen", "currentSection", "sectionRefList"]
  );

  return (
    <>
      <main className="w-full scroll-container">
        <Navigation
          fixed={isLargeScreen}
          isBgDark={
            !isSmallScreen || sectionBgWithDarkColor.includes(currentSection)
          }
        />
        <SectionOne ref={sectionOneRef} />
        <SectionTwo ref={sectionTwoRef} />
        <SectionThree ref={sectionThreeRef} />
        <SectionFour ref={sectionFourRef} />
        <Footer ref={footerRef} fullScreen={true} />
        {showSectionNav && (
          <SectionNav
            currentSection={currentSection}
            sectionNumber={sectionRefList.length}
            setCurrentSection={setCurrentSection}
            sectionBgWithDarkColor={sectionBgWithDarkColor}
          />
        )}
      </main>
    </>
  );
}
