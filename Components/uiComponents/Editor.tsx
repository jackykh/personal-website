import { ChangeEventHandler } from "react";
import useEnterToFetch from "@/hooks/useEnterToFetch";

interface editorProps {
  placeholder?: string;
  row?: number;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit: () => void;
}

const Editor = (props: editorProps) => {
  useEnterToFetch(props.onSubmit);
  return (
    <div className="relative">
      <textarea
        className="input"
        onChange={props.onChange}
        placeholder={props.placeholder || "Enter Your Message Here."}
        rows={props.row || 3}
        value={props.value}
        required
      />
      <button
        onClick={props.onSubmit}
        className="absolute bottom-1 right-0 p-2 bg-purple-800  text-white"
      >
        Submit
      </button>
    </div>
  );
};

Editor.displayName = "Editor";

export default Editor;
