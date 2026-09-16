import PostPreview from "./uiComponents/PostPreview";
import Pagination from "./uiComponents/Pagination";
import Footer from "./Footer";
import { PostPreviewProps } from "./uiComponents/PostPreview";

interface postListProps {
  link: string;
  listTitle: string;
  totalPage: number;
  currentPage: number;
  postPreviewData: Array<PostPreviewProps>;
}

const PostList = (props: postListProps) => {
  const postPreviewList = props.postPreviewData.map((post) => (
    <PostPreview
      key={post.id}
      id={post.id}
      date={post.date}
      title={post.title}
      content={post.content}
      isPinned={post.isPinned}
    />
  ));

  return (
    <>
      <main className="pt-32 pb-24 px-6 sm:px-10 flex flex-col items-center min-h-screen">
        <div className="w-full max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted mb-6">
            Blog
          </p>
          <h1 className="font-display font-medium uppercase tracking-[-0.02em] leading-none text-[clamp(2.5rem,6vw,4.5rem)] text-ink mb-12">
            {props.listTitle}
          </h1>
          <div className="mb-14 w-full flex flex-col border-t border-line">
            {postPreviewList}
          </div>
          <Pagination
            currentPage={props.currentPage}
            totalPage={props.totalPage}
            link={props.link}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PostList;
