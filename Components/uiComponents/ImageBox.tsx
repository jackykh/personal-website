import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const ImageBox: React.FC<{
  img: string;
  caption: string;
  link: string;
}> = (props) => {
  const item = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="w-full h-[15rem] rounded-xl overflow-hidden group relative bg-slate-200 shadow-lg shadow-black/30 border border-solid"
      variants={item}
    >
      <Image
        src={props.img}
        alt="image"
        className="w-full h-full group-hover:blur-sm group-hover:brightness-50 transition-all object-cover object-center absolute"
        width={512}
        height={512}
      />
      <div className="text-white text-center translate-y-[20rem] font-bold group-hover:translate-y-[5rem] transition-all">
        <figcaption className="mb-5 text-lg ">{props.caption}</figcaption>
        <Link href={props.link} className="btn text-base">
          Visit Website
        </Link>
      </div>
    </motion.div>
  );
};

export default ImageBox;
