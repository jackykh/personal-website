import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { faDeepseek } from "./CustomIcon";
import { Typewriter } from "./Typewriter";

export type SummaryProps = {
  content?: string | undefined;
};

const Summary = (props: SummaryProps) => {
  const { content } = props;
  if (content) {
    return (
      <div className="w-full rounded bg-purple-100 p-2 mb-4 text-base">
        <div className="w-full flex justify-between mb-2 items-center px-1 pt-0">
          <span>
            <FontAwesomeIcon icon={faWandMagicSparkles} /> AI 摘要
          </span>
          <div className="flex items-end">
            <span className="italic text-sm">powered by&nbsp;</span>
            <FontAwesomeIcon icon={faDeepseek} />
          </div>
        </div>
        <div className="w-full rounded p-2 bg-white">
          <Typewriter text={content} />
        </div>
      </div>
    );
  }
};

export default Summary;
