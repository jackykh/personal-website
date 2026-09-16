import Link from "next/link";

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
      className="group w-full py-8 flex flex-col border-b border-line"
    >
      <div className="flex justify-between items-baseline mb-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          {props.date}
        </span>
        {props.isPinned && (
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent border border-accent/40 rounded-full px-2.5 py-0.5">
            Pinned
          </span>
        )}
      </div>
      <h2 className="font-serif text-2xl sm:text-4xl text-ink group-hover:italic transition-all">
        {props.title}
      </h2>
      <p className="mt-3 text-soft leading-relaxed line-clamp-2">
        {props.content}
      </p>
    </Link>
  );
};

export default PostPreview;
