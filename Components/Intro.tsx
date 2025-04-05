import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faNode, faCss3 } from "@fortawesome/free-brands-svg-icons";
import classes from "@/styles/Intro.module.css";

const Intro = forwardRef<HTMLElement>((_props, ref) => {
  return (
    <section
      className="w-full min-h-screen pt-[7rem] bg-green-100 flex flex-col items-center "
      ref={ref}
    >
      <div className={classes.background}>
        <h2 className="text-4xl font-bold mb-4">
          Hi, I’m Jacky. Nice to meet you.
        </h2>
        <p className="text-2xl">
          I am a 2021 graduate with a history degree in Hong Kong. After
          graduation, I find my real passion for frontend deveploment and throw
          all my energies into pursuing related knowledge.
        </p>
      </div>
      <div className="flex-1 w-full bg-[#219f94] flex justify-center pb-[10rem]">
        <div className={classes.skill_card}>
          <div className={classes.skill_card_item_left}>
            <div
              className={`${classes.skill_card_logo} ${classes.skill_card_logo_react}`}
            >
              <FontAwesomeIcon icon={faReact} />
            </div>
            <h3 className="mb-2 text-xl font-bold">React</h3>

            <ul className="text-sm text-center leading-relaxed font-light tracking-wider">
              <li>TypeScript React</li>
              <li>Framer Motion</li>
              <li>Next.js</li>
              <li>React Native</li>
            </ul>
          </div>
          <div className={classes.skill_card_item_middle}>
            <div
              className={`${classes.skill_card_logo} ${classes.skill_card_logo_node}`}
            >
              <FontAwesomeIcon icon={faNode} />
            </div>
            <h3 className="mb-2 text-xl font-bold">Node.js</h3>

            <ul className="text-sm text-center leading-relaxed font-light tracking-wider">
              <li>Express.js</li>
              <li>MongoDB</li>
              <li>GraphQL</li>
            </ul>
          </div>
          <div className={classes.skill_card_item_right}>
            <div
              className={`${classes.skill_card_logo} ${classes.skill_card_logo_css}`}
            >
              <FontAwesomeIcon icon={faCss3} />
            </div>
            <h3 className="mb-2 text-xl font-bold text-center">CSS</h3>

            <ul className="text-sm text-center leading-relaxed font-light tracking-wider">
              <li>SASS</li>
              <li>Tailwind CSS</li>
              <li>FlexBox</li>
              <li>Grid</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
});

Intro.displayName = "Intro";

export default Intro;
