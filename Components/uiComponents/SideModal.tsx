import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { TouchEventHandler } from "react";

const SideModal: React.FC<{
  isShown: boolean;
  content: ReactNode;
  setContent: React.Dispatch<React.SetStateAction<ReactNode>>;
}> = (props) => {
  useEffect(() => {
    if (props.isShown) {
      document.body.classList.add("scrollbar-disable");
    } else {
      document.body.classList.remove("scrollbar-disable");
    }
  }, [props.isShown]);

  const closeModal = () => {
    props.setContent(null);
  };
  const stopTouchPropagation: TouchEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <AnimatePresence>
        {props.isShown && (
          <div
            className="w-full h-full fixed top-0 z-[100] text-[16px] leading-[24px]"
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={stopTouchPropagation}
            onTouchMove={stopTouchPropagation}
            onTouchEnd={stopTouchPropagation}
          >
            <motion.div
              className="overlay w-full h-full bg-black bg-opacity-80 absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            ></motion.div>
            <motion.div
              className="w-full sm:w-[544px] h-full p-[32px] z-[120] absolute bg-white right-0 overflow-y-scroll"
              initial={{ right: -544 }}
              animate={{ right: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ right: -544 }}
            >
              <div className="flex justify-between items-center border-b border-b-[#eaeaea] pb-[13px]">
                <button className="pt-[2px]">
                  <FontAwesomeIcon
                    icon={faArrowAltCircleLeft}
                    onClick={closeModal}
                    className="text-[20px]"
                  />
                </button>
                <span
                  className="hover:underline cursor-pointer"
                  onClick={closeModal}
                >
                  Back To HomePage.
                </span>
              </div>
              {props.content}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideModal;
