import { motion } from "framer-motion";
import Marquee from "./uiComponents/Marquee";

const lineAnim = (delay: number) => ({
  initial: { y: "110%" },
  animate: { y: "0%" },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

const Hero = () => {
  return (
    <>
      <section className="w-full min-h-screen flex flex-col justify-between px-6 sm:px-10 pt-24 sm:pt-28 pb-8">
        <motion.div
          className="flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <span>Portfolio © 2026</span>
          <span className="hidden sm:block">Frontend Developer</span>
          <span>Hong Kong</span>
        </motion.div>

        <div>
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
                Scroll ↓
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
