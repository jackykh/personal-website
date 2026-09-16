import { useState, useRef, MouseEventHandler } from "react";
import { motion, AnimatePresence } from "framer-motion";
import classes from "@/styles/Navigation.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useCloseDropdownWhenClickedOutside from "@/hooks/useCloseDropdownWhenClickedOutside";

const Navigation = () => {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const isBlog = pathname.startsWith("/blog") && pathname !== "/blog/category";

  const closeNav = () => setShowNav(false);
  const toggleNav: MouseEventHandler = (e) => {
    e.stopPropagation();
    setShowNav((prevState) => !prevState);
  };

  useCloseDropdownWhenClickedOutside(navRef, closeNav);

  const links: Array<{
    index: string;
    label: string;
    href?: string;
    external?: boolean;
  }> = [
    { index: "01", label: "Home", href: isHomepage ? undefined : "/" },
    { index: "02", label: "My Blog", href: "/blog/page/1" },
    ...(isBlog
      ? [{ index: "03", label: "Categories", href: "/blog/category" }]
      : []),
    { index: isBlog ? "04" : "03", label: "Side Projects", href: "/projects" },
    {
      index: isBlog ? "05" : "04",
      label: "My Resume",
      href: "/resume",
      external: true,
    },
  ];

  return (
    <>
      <Link
        href="/"
        className="fixed left-5 top-5 md:left-10 md:top-10 z-[80] h-11 flex items-center font-mono text-[11px] uppercase tracking-[0.25em] text-ink"
      >
        Jacky<span className="text-muted">.</span>Cheung
      </Link>
      <div
        className="fixed right-5 top-5 md:right-10 md:top-10 z-[80]"
        ref={navRef}
      >
      <button
        className="w-11 h-11 rounded-full border border-line bg-paper/85 backdrop-blur flex items-center justify-center"
        onClick={toggleNav}
        aria-label="Toggle navigation"
      >
        <span
          className={`${
            showNav ? classes.navi_icon_close : classes.navi_icon
          }`}
        ></span>
      </button>
      <AnimatePresence>
        {showNav && (
          <motion.nav
            className="absolute right-0 top-14 min-w-[17rem] bg-paper border border-line shadow-[0_12px_40px_rgba(27,26,23,0.08)] p-8"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            exit={{ opacity: 0, y: -8 }}
          >
            <ul className="space-y-5">
              {links.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <Link
                      href={link.href}
                      className="group flex items-baseline gap-4 text-ink"
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <span className="font-mono text-[10px] text-muted">
                        {link.index}
                      </span>
                      <span className="font-serif text-xl group-hover:italic transition-all">
                        {link.label}
                      </span>
                    </Link>
                  ) : (
                    <span className="flex items-baseline gap-4 text-ink">
                      <span className="font-mono text-[10px] text-muted">
                        {link.index}
                      </span>
                      <span className="font-serif text-xl italic">
                        {link.label}
                      </span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Navigation;
