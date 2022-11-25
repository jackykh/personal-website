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

  const sectionWheelHandler = useCallback(
    (event: WheelEvent) => {
      event.preventDefault();

      /// The Length of sectionRefList
      const sectionRefNumber = sectionRefList.length;

      const currentTime = Date.now();
      const animationBreak = 1800;
      const notRapidSuccession =
        currentTime > lastTimeRef.current + animationBreak;
      if (notRapidSuccession) {
        if (event.deltaY < 0) {
          setCurrentSection((prevState) => {
            if (prevState > 0) {
              return prevState - 1;
            } else {
              return prevState;
            }
          });
        } else if (event.deltaY >= 0) {
          setCurrentSection((prevState) => {
            if (prevState < sectionRefNumber - 1) {
              return prevState + 1;
            } else {
              return prevState;
            }
          });
        }
        lastTimeRef.current = currentTime;
      }
    },
    [sectionRefList]
  );

  const isKeyHandled = useRef<boolean>(false);

  const sectionKeyDownHandler = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault();
      /// The Length of sectionRefList
      if (!isKeyHandled.current) {
        const sectionRefNumber = sectionRefList.length;
        if (event.key == "ArrowUp") {
          // up arrow
          setCurrentSection((prevState) => {
            if (prevState > 0) {
              return prevState - 1;
            } else {
              return prevState;
            }
          });
        } else if (event.key == "ArrowDown") {
          // down arrow
          setCurrentSection((prevState) => {
            if (prevState < sectionRefNumber - 1) {
              return prevState + 1;
            } else {
              return prevState;
            }
          });
        }
        isKeyHandled.current = true;
      }
    },
    [sectionRefList]
  );

  const sectionKeyUpHandler = useCallback((event: KeyboardEvent) => {
    if (isKeyHandled.current) {
      if (event.key == "ArrowUp" || event.key == "ArrowDown") {
        isKeyHandled.current = false;
      }
    }
  }, []);

  useEffect(() => {
    if (isMiddleScreen) {
      document.addEventListener("wheel", sectionWheelHandler, {
        passive: false,
      });
      setSectionNav(true);
    }
    document.addEventListener("keydown", sectionKeyDownHandler);
    document.addEventListener("keyup", sectionKeyUpHandler);
    return () => {
      document.removeEventListener("wheel", sectionWheelHandler);
      setSectionNav(false);
    };
  }, [
    isMiddleScreen,
    sectionWheelHandler,
    sectionKeyDownHandler,
    sectionKeyUpHandler,
  ]);

  useEffect(() => {
    if (sectionRefList[currentSection].current) {
      (sectionRefList[currentSection].current! as HTMLElement).scrollIntoView();
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
