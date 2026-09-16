import { motion } from "framer-motion";
import Marquee from "./uiComponents/Marquee";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const lineAnim = (delay: number) => ({
  initial: { y: "110%" },
  animate: { y: "0%" },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

const Hero = () => {
  return (
    <>
      <section className="relative w-full min-h-screen flex flex-col justify-between px-6 sm:px-10 pt-24 sm:pt-28 pb-8 overflow-hidden">
        {/* Soft aurora blobs behind hero content */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -top-[15%] right-[-20%] sm:right-[0%] w-[90vw] h-[90vw] sm:w-[60vw] sm:h-[60vw] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(62,92,73,0.45) 0%, rgba(62,92,73,0) 65%)",
            }}
            animate={{ x: [0, -60, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[35%] sm:top-[25%] -left-[35%] sm:-left-[12%] w-[100vw] h-[100vw] sm:w-[52vw] sm:h-[52vw] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(214,179,106,0.4) 0%, rgba(214,179,106,0) 65%)",
            }}
            animate={{ x: [0, 50, 0], y: [0, -45, 0], scale: [1, 1.15, 1] }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute bottom-[5%] sm:bottom-[0%] right-[-15%] sm:right-[20%] w-[80vw] h-[80vw] sm:w-[42vw] sm:h-[42vw] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(224,122,95,0.3) 0%, rgba(224,122,95,0) 65%)",
            }}
            animate={{ x: [0, -40, 0], y: [0, -30, 0], scale: [1, 1.08, 1] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>

        <motion.div
          className="relative z-10 flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <span>Portfolio © 2026</span>
          <span className="hidden sm:block">Frontend Developer</span>
          <span>Hong Kong</span>
        </motion.div>

        <div className="relative z-10">
          <h1 className="font-display font-medium uppercase leading-[0.9] tracking-[-0.03em] text-ink">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block text-[clamp(2.6rem,10.5vw,10.5rem)] whitespace-nowrap"
                {...lineAnim(0.1)}
              >
                Jacky Cheung
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.1em]">
              <motion.span
                className="block text-[clamp(2rem,7.5vw,7.5rem)]"
                {...lineAnim(0.25)}
              >
                <span className="text-outline">Frontend</span>{" "}
                <em className="font-serif italic font-normal normal-case tracking-normal">
                  developer.
                </em>
              </motion.span>
            </span>
          </h1>

          <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
            <motion.p
              className="max-w-md text-soft text-lg leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              I love building beautiful websites and learning frontend
              engineering.
            </motion.p>
            <motion.div
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
            >
              <span className="inline-flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-soft border border-line rounded-full px-4 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                Available for work
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted hidden sm:block">
                Scroll <FontAwesomeIcon icon={faArrowDown} />
              </span>
            </motion.div>
          </div>
        </div>
      </section>
      <Marquee />
    </>
  );
};

export default Hero;
