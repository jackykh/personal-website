import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbtack } from "@fortawesome/free-solid-svg-icons";

export type PostPreviewProps = {
  id: string;
  date: string;
  title: string;
  content: string;
  isPinned: boolean;
};

const PostPreview = (props: PostPreviewProps) => {
  return (
    <Link
      href={`/blog/post/${props.id}`}
      className="w-full max-w-[50rem] p-4 flex flex-col border-b [&>*]:mb-4 "
    >
      <div className="flex justify-between">
        <span className="text-base font-light">{props.date}</span>
        {props.isPinned && (
          <span className="text-gray-400 text-base font-light">
            PINNED&nbsp;&nbsp;
            <FontAwesomeIcon
              icon={faThumbtack}
              className="rotate-45 text-red-600"
            />
          </span>
        )}
      </div>
      <h2 className="text-3xl font-semibold">{props.title}</h2>
      <p className="text-lg font-light">{props.content}</p>
    </Link>
  );
};

export default PostPreview;
