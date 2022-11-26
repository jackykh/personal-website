import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import SectionOne from "../Components/SectionOne";
import SectionTwo from "../Components/SectionTwo";
import SectionThree from "../Components/SectionThree";
import SectionFour from "../Components/SectionFour";
import Footer from "../Components/Footer";
import SectionNav from "../Components/uiComponents/SectionNav";
import { useMediaQuery } from "react-responsive";

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

  const isMiddleScreen = useMediaQuery({ query: "(min-width: 1024px)" });

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
    if (isMiddleScreen) {
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
    isMiddleScreen,
    sectionWheelHandler,
    sectionKeyDownHandler,
    sectionKeyUpHandler,
    touchstartHandler,
    touchMoveHandler,
    touchEndHandler,
  ]);

  useEffect(() => {
    if (sectionRefList[currentSection].current) {
      (sectionRefList[currentSection].current! as HTMLElement).scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [currentSection, sectionRefList]);

  return (
    <main className="w-full">
      <SectionOne ref={sectionOneRef} />
      <SectionTwo ref={sectionTwoRef} />
      <SectionThree ref={sectionThreeRef} />
      <SectionFour ref={sectionFourRef} />
      <Footer ref={footerRef} />
      {showSectionNav && (
        <SectionNav
          currentSection={currentSection}
          sectionNumber={sectionRefList.length}
          setCurrentSection={setCurrentSection}
          sectionBgWithDarkColor={sectionBgWithDarkColor}
        />
      )}
    </main>
  );
}
