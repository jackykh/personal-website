import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faNode, faCss3 } from "@fortawesome/free-brands-svg-icons";
import classes from "../styles/SectionTwo.module.css";

const SectionTwo = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <section
      className="w-full min-h-screen pt-[7rem] bg-green-100 flex flex-col items-center "
      ref={ref}
    >
      <div className={classes.intro}>
        <h1 className="text-4xl font-bold mb-4">
          Hi, I’m Jacky. Nice to meet you.
        </h1>
        <p className="text-2xl">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
          error saepe eius eligendi ut exercitationem quidem ullam. Culpa
          laborum aliquam porro, praesentium mollitia commodi odit esse quaerat
          velit iusto voluptatum!
        </p>
      </div>
      <div className="flex-1 w-full bg-[#219f94] flex justify-center pb-[10rem]">
        <div className={classes.skill_card}>
          <div className={classes.skill_card_item_left}>
            <div className={classes.skill_card_logo}>
              <FontAwesomeIcon icon={faReact} />
            </div>
            <h3 className="mb-3 text-xl font-bold">React</h3>
            <p className="text-center text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              tenetur impedit iusto ut, consectetur labore amet
            </p>
          </div>
          <div className={classes.skill_card_item_middle}>
            <div className={classes.skill_card_logo}>
              <FontAwesomeIcon icon={faNode} />
            </div>
            <h3 className="mb-3 text-xl font-bold">Node.js</h3>
            <p className="text-center text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              tenetur impedit iusto ut, consectetur labore amet
            </p>
          </div>
          <div className={classes.skill_card_item_right}>
            <div className={classes.skill_card_logo}>
              <FontAwesomeIcon icon={faCss3} />
            </div>
            <h3 className="mb-3 text-xl font-bold text-center">CSS</h3>
            <p className="text-center text-sm ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime
              tenetur impedit iusto ut, consectetur labore amet
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

SectionTwo.displayName = "SectionTwo";

export default SectionTwo;
