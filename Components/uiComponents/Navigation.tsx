import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classes from "../../styles/Navigation.module.css";
import Link from "next/link";
const Navigation = (props: { fixed?: boolean; isBgDark?: boolean }) => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);

  const closeNav = () => setShowNav(false);
  const toggleNav = () => setShowNav((prevState) => !prevState);

  const useCloseDropdownWhenClickedOutside = (
    ref: React.RefObject<HTMLElement>,
    onClose: (clickedItem: Node) => void
  ) => {
    useEffect(() => {
      /**
       * close the dropdown if clicked on outside of element
       */
      const handleClickOutside = (event: MouseEvent) => {
        const clickedItem = event.target as Node;
        if (ref.current && !ref.current.contains(clickedItem)) {
          onClose(clickedItem);
        }
      };
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, onClose]);
  };

  useCloseDropdownWhenClickedOutside(navRef, closeNav);

  const bgColorOfNavButton =
    props.isBgDark && !showNav
      ? "bg-[#c1deae] before:bg-[#c1deae] after:bg-[#c1deae]"
      : "bg-green-900 before:bg-green-900 after:bg-green-900";

  return (
    <div
      className={`${
        props.fixed ? "fixed" : "absolute"
      } right-5 top-5 md:right-14 md:top-14 z-[80]`}
      ref={navRef}
    >
      <button className={classes.navi_toggle} onClick={toggleNav}>
        <span
          className={`${
            showNav ? classes.navi_icon_close : classes.navi_icon
          } ${bgColorOfNavButton}`}
        ></span>
      </button>
      <AnimatePresence>
        {showNav && (
          <motion.nav
            className="min-w-[20rem] bg-white p-12 pt-20 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ul className="[&>*]:mb-6 text-green-800 text-xl ">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog/page/1">My Blog</Link>
              </li>
              <li>
                <Link target="_blank" rel="noopener noreferrer" href="/resume">
                  My Resume
                </Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navigation;