import { ReactNode, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

// Sets the page background color when this section covers the
// middle band of the viewport while scrolling.
const SectionBg: React.FC<{
  color: string;
  onActive: (color: string) => void;
  children: ReactNode;
}> = ({ color, onActive, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(color);
  }, [inView, color, onActive]);

  return (
    <div ref={ref} className="relative z-10">
      {children}
    </div>
  );
};

export default SectionBg;
