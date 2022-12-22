import PostPreview from "./uiComponents/PostPreview";
import Navigation from "./uiComponents/Navigation";
import Pagination from "./uiComponents/Pagination";
import Footer from "./Footer";
import { v4 as uuidv4 } from "uuid";

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
      key={uuidv4()}
      id={post.id}
      date={post.date}
      title={post.title}
      content={post.content}
    />
  ));

  return (
    <>
      <Navigation />
      <main className="py-24  px-8 flex flex-col items-center">
        <h1 className="text-4xl mb-4">{props.listTitle}</h1>
        <div className="mb-12">{postPreviewList}</div>
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
