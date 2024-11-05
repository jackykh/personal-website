import classes from "@/styles/BlinkText.module.css";

const BlinkText = (props: { text: string; className?: string }) => {
  const className = props.className
    ? classes.blinkText + " " + props.className
    : classes.blinkText;
  const letters = props.text.split("");
  const blinkLetters = letters.map((t, i) => {
    i += 1;
    let delay = i / 20;
    if (i % 2 === 0) {
      delay -= 0.1;
    } else {
      delay += 0.05;
    }
    const transitionDelay = delay + "s";
    return (
      <span key={i}>
        <span style={{ transitionDelay }} className={classes.out}>
          {t}
        </span>
        <span style={{ transitionDelay }} className={classes.in}>
          {t}
        </span>
      </span>
    );
  });
  return <div className={className}>{blinkLetters}</div>;
};

export default BlinkText;
