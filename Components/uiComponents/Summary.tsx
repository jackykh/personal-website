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
      <div className="w-full border border-line bg-white mb-6 text-base">
        <div className="w-full flex justify-between items-center px-4 py-3 border-b border-line">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
            <FontAwesomeIcon icon={faWandMagicSparkles} className="mr-2" />
            AI 摘要
          </span>
          <div className="flex items-end text-muted">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
              powered by&nbsp;
            </span>
            <FontAwesomeIcon icon={faDeepseek} />
          </div>
        </div>
        <div className="w-full p-4 text-soft leading-relaxed">
          <Typewriter text={content} />
        </div>
      </div>
    );
  }
};

export default Summary;
