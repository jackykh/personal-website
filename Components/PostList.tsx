import PostPreview from "./uiComponents/PostPreview";
import Pagination from "./uiComponents/Pagination";
import Footer from "./Footer";

interface postListProps {
  link: string;
  listTitle: string;
  totalPage: number;
  currentPage: number;
  postPreviewData: Array<{
    id: string;
    date: string;
    title: string;
    content: string;
  }>;
}

const PostList = (props: postListProps) => {
  const postPreviewList = props.postPreviewData.map((post) => (
    <PostPreview
      key={post.id}
      id={post.id}
      date={post.date}
      title={post.title}
      content={post.content}
    />
  ));

  return (
    <>
      <main className="py-24  px-8 flex flex-col items-center">
        <h1 className="text-4xl mb-4">{props.listTitle}</h1>
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
