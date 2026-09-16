import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

const ImageBox: React.FC<{
  img: StaticImageData;
  caption: string;
  btnOnClick: () => void;
  index?: string;
}> = (props) => {
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.button
      className="group w-full text-left"
      variants={item}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={props.btnOnClick}
    >
      <div className="w-full aspect-[4/3] overflow-hidden border border-line bg-white">
        <Image
          src={props.img}
          alt={props.caption}
          className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          {...(props.img.src.endsWith(".gif")
            ? {}
            : { placeholder: "blur" as const })}
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <span className="text-sm text-soft leading-snug">
          {props.index && (
            <span className="font-mono text-[11px] text-muted mr-3">
              {props.index}
            </span>
          )}
          {props.caption}
        </span>
        <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-muted group-hover:text-ink transition-colors">
          View →
        </span>
      </div>
    </motion.button>
  );
};

export default ImageBox;
