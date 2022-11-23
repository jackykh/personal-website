import { ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";

const SectionNav: React.FC<{
  sectionNumber: number;
  currentSection: number;
  setCurrentSection: (sectionNumber: number) => void;
  sectionBgWithDarkColor: number[];
}> = (props) => {
  const sectionNavButtons = () => {
    const navButtonsList: Array<ReactNode> = [];
    const isCurrentSectionBgWithDarkColor =
      props.sectionBgWithDarkColor.includes(props.currentSection);
    const activeSectionClass = isCurrentSectionBgWithDarkColor
      ? "bg-transparent rotate-45 border-[#F9F9C5] border-solid border-2"
      : "bg-transparent rotate-45 border-purple-900 border-solid border-2";
    const sectionClass = isCurrentSectionBgWithDarkColor
      ? "rounded-full bg-[#F9F9C5]"
      : "rounded-full bg-purple-900";
    for (let i = 0; i < props.sectionNumber; i++) {
      navButtonsList.push(
        <li key={uuidv4()}>
          <button
            className={`w-3 h-3 transition-all ${
              props.currentSection === i ? activeSectionClass : sectionClass
            }`}
            onClick={props.setCurrentSection.bind(null, i)}
          >
            &nbsp;
          </button>
        </li>
      );
    }
    return navButtonsList;
  };

  return (
    <ul className="fixed bottom-[50%] translate-y-1/2 right-16 flex flex-col h-32 justify-between">
      {sectionNavButtons()}
    </ul>
  );
};

export default SectionNav;
