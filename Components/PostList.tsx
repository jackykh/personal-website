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
      <main className="py-24  px-8 flex flex-col items-center">
        <h1 className="text-4xl mb-4 font-bold">{props.listTitle}</h1>
        <div className="mb-12 w-full flex flex-col items-center">
          {postPreviewList}
        </div>
        <Pagination
          currentPage={props.currentPage}
          totalPage={props.totalPage}
          link={props.link}
        />
      </main>
      <Footer />
    </>
  );
};

export default PostList;
