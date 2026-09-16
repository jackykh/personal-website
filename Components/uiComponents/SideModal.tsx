import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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
            className="w-full h-full fixed top-0 z-[100] text-[15px] leading-[24px] text-ink"
            onWheel={(e) => e.stopPropagation()}
            onTouchStart={stopTouchPropagation}
            onTouchMove={stopTouchPropagation}
            onTouchEnd={stopTouchPropagation}
          >
            <motion.div
              className="overlay w-full h-full bg-ink/40 absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            ></motion.div>
            <motion.div
              className="w-full sm:w-[544px] h-full p-8 sm:p-10 z-[120] absolute bg-paper right-0 overflow-y-scroll border-l border-line"
              initial={{ right: -544 }}
              animate={{ right: 0 }}
              transition={{ duration: 0.3 }}
              exit={{ right: -544 }}
            >
              <div className="flex justify-between items-center border-b border-line pb-4">
                <button
                  className="text-muted hover:text-ink transition-colors"
                  onClick={closeModal}
                  aria-label="Close"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="text-base" />
                </button>
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted hover:text-ink cursor-pointer transition-colors"
                  onClick={closeModal}
                >
                  Back
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
