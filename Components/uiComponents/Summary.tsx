import Image from "next/image";
import deepseekLogo from "@/public/deepseek-text.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { Typewriter } from "./Typewriter";

export type SummaryProps = {
  content?: string | undefined;
};

const Summary = (props: SummaryProps) => {
  const { content } = props;
  if (content) {
    return (
      <div className="w-full rounded bg-purple-100 p-2 mb-4 text-base">
        <div className="w-full flex justify-between mb-1 items-center p-1">
          <span className="italic">
            <FontAwesomeIcon icon={faWandMagicSparkles} /> AI Summary
          </span>
          <Image src={deepseekLogo} alt="DeepSeek Logo" className="h-4" />
        </div>
        <div className="w-full rounded p-2 bg-white">
          <Typewriter text={content} />
        </div>
      </div>
    );
  }
};

export default Summary;
