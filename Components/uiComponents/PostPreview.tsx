import Link from "next/link";

type PostPreviewProps = {
  id: string;
  date: string;
  title: string;
  content: string;
};

const PostPreview = (props: PostPreviewProps) => {
  return (
    <Link
      href={`/blog/post/${props.id}`}
      className="w-full max-w-[50rem] p-4 flex flex-col border-b [&>*]:mb-4 "
    >
      <span className="text-base font-light">{props.date}</span>
      <h1 className="text-3xl font-semibold">{props.title}</h1>
      <p className="text-lg font-light">{props.content}</p>
    </Link>
  );
};

export default PostPreview;
