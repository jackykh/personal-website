import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import classes from "@/styles/ImageBox.module.css";

const ImageBox: React.FC<{
  img: StaticImageData;
  caption: string;
  btnOnClick: () => void;
}> = (props) => {
  const item = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="w-full h-[18rem] md:h-[15rem] rounded-xl overflow-hidden group relative bg-slate-200 shadow-lg shadow-black/30 border border-solid"
      variants={item}
      transition={{ duration: 0.4 }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onTouchEnd={(e) => e.stopPropagation()}
    >
      <Image
        src={props.img}
        alt="image"
        className="w-full h-full group-hover:blur-sm group-hover:brightness-50 transition-all object-cover object-top absolute"
        placeholder="blur"
      />
      <div className="text-white text-center translate-y-[20rem] font-bold group-hover:translate-y-[6.5rem] md:group-hover:translate-y-[5rem] transition-all">
        <figcaption className="mb-5 text-lg ">{props.caption}</figcaption>
        <button className="btn text-base" onClick={props.btnOnClick}>
          See Details
        </button>
      </div>
    </motion.div>
  );
};

export default ImageBox;
