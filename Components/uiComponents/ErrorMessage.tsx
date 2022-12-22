import { createPortal } from "react-dom";
import classes from "../../styles/ErrorMessage.module.css";

const ErrorMessage = (props: { content: string }) => {
  return createPortal(
    <div className={classes.error_message}>{props.content}</div>,
    document.getElementById("portal")!
  );
};

export default ErrorMessage;
