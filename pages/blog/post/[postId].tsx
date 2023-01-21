import { useState, ChangeEventHandler } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Footer from "../../../Components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "github-markdown-css/github-markdown-light.css";
import classes from "../../../styles/Post.module.css";
import Link from "next/link";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import client from "../../../lib/apollo-client";
import { v4 as uuidv4 } from "uuid";
import Navigation from "../../../Components/uiComponents/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../../../Components/uiComponents/LoadingSpinner";
import Editor from "../../../Components/uiComponents/Editor";

interface postProps {
  id: string;
  date: string;
  title: string;
  content: string;
  tags: Array<{
    name: string;
    id: string;
  }>;
  initialComments: Array<{
    content: string;
    date: string;
  }>;
  totalComments: number;
  isPageValid: boolean;
}

const commentsLoadPerClick = 1;

const Post = (props: postProps) => {
  const [comments, setComments] = useState<
    Array<{
      content: string;
      date: string;
    }>
  >(props.initialComments);
  const [pageOfComments, setPageOfComments] = useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const [newComment, setNewComment] = useState("");

  const LOAD_COMMENTS = gql`
    query LoadComments($id: ID!, $page: Int!, $pageSize: Int!) {
      comments(
        filters: { post: { id: { eq: $id } } }
        pagination: { pageSize: $pageSize, page: $page }
      ) {
        data {
          attributes {
            content
            createdAt
          }
        }
      }
    }
  `;

  interface commentsData {
    comments: {
      data: Array<{
        attributes: {
          content: string;
          createdAt: string;
        };
      }>;
    };
  }

  const CREATE_COMMENT = gql`
    mutation createComment($postId: ID!, $content: String!) {
      createComment(data: { post: $postId, content: $content }) {
        data {
          attributes {
            content
            createdAt
          }
        }
      }
    }
  `;

  interface createCommentsResponse {
    createComment: {
      data: {
        attributes: {
          content: string;
          createdAt: string;
        };
      };
    };
  }

  const [loadComments, { loading }] = useLazyQuery(LOAD_COMMENTS, {
    variables: {
      id: props.id,
      pageSize: commentsLoadPerClick,
      page: pageOfComments + 1,
    },
  });

  const [createComments, { loading: creating }] = useMutation(CREATE_COMMENT);

  const loadCommentsHandler = async () => {
    const result = await loadComments();
    const loadedComments = (result.data as commentsData).comments.data.map(
      (comment) => {
        return {
          content: comment.attributes.content,
          date: comment.attributes.createdAt,
        };
      }
    );
    setComments((prevState) => prevState.concat(loadedComments));
    setPageOfComments((prevState) => prevState + 1);
  };

  const createCommentHandler = async () => {
    if (newComment.trim().length === 0) return;
    const result = await createComments({
      variables: {
        postId: props.id,
        content: newComment,
      },
    });
    const loadedComments = (result.data as createCommentsResponse).createComment
      .data.attributes;
    setComments((prevState) => [
      { content: loadedComments.content, date: loadedComments.createdAt },
      ...prevState,
    ]);
    setNewComment("");
  };

  const editorOnChangeHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setNewComment(event.target.value);
  };

  const commentBox = props.isPageValid && (
    <div className="border w-full text-sm">
      <div className="py-2 px-6 border-b text-xl bg-slate-200 flex justify-between items-center">
        <h3>Comments</h3>
        <button
          className="py-2 px-3 hover:bg-slate-400 rounded"
          onClick={() => setShowEditor((prevState) => !prevState)}
        >
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </div>
      {showEditor && (
        <Editor
          onChange={editorOnChangeHandler}
          onSubmit={createCommentHandler}
          value={newComment}
        />
      )}
      {creating && (
        <div className="p-4 h-[5rem] border-b flex justify-center">
          <LoadingSpinner />
        </div>
      )}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={uuidv4()} className="p-4 min-h-[5rem] border-b">
            <span>{comment.content}</span>
          </div>
        ))
      ) : (
        <div className="h-[5rem] p-6">
          <span className="text-lg">No comments</span>
        </div>
      )}
    </div>
  );
  const button =
    comments.length < props.totalComments && !loading ? (
      <button
        className="btn max-w-[15rem] text-base mt-4"
        onClick={loadCommentsHandler}
      >
        Click Here to load more.
      </button>
    ) : null;

  return (
    <>
      <Navigation />
      <main className="py-28 px-12 flex justify-center">
        <div className="flex flex-col w-[60rem] max-w-full">
          <div className="flex [&>*]:mr-4 border-b border-black py-2 text-base font-light">
            <span>{props.date}</span>
            <span>
              tag:{" "}
              {props.tags.map((tag) => (
                <Link
                  key={uuidv4()}
                  href={`/blog/category/${tag.id}/page/1`}
                  className="text-purple-900 font-semibold mr-2"
                >
                  {tag.name}
                </Link>
              ))}
            </span>
          </div>
          <div className="py-4 mb-12">
            <h1 className="text-3xl font-semibold mb-4">{props.title}</h1>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              className={`markdown-body ${classes.list_disc}`}
            >
              {props.content}
            </ReactMarkdown>
          </div>
          <div className="flex flex-col items-center">
            {commentBox}
            {button}
            {loading && <LoadingSpinner className="mt-4" />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ALL_POSTS_ID = gql`
    query GetAllPostsID {
      posts {
        data {
          id: id
        }
      }
    }
  `;

  const { data } = await client.query({
    query: ALL_POSTS_ID,
  });

  type allPostsIdData = Array<{
    id: string;
  }>;
  const paths = (data.posts.data as allPostsIdData).map((postId) => {
    return { params: { postId: postId.id } };
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const POST = gql`
    query GetPosts($id: ID!, $page: Int!, $pageSize: Int!) {
      post(id: $id) {
        data {
          id: id
          attributes {
            title
            content
            createdAt
            categories {
              data {
                id: id
                attributes {
                  name
                }
              }
            }
          }
        }
      }
      comments(
        filters: { post: { id: { eq: $id } } }
        pagination: { pageSize: $pageSize, page: $page }
      ) {
        meta {
          pagination {
            total
          }
        }
        data {
          attributes {
            content
            createdAt
          }
        }
      }
    }
  `;

  interface PostData {
    post: {
      data?: {
        id: string;
        attributes: {
          title: string;
          content: string;
          createdAt: string;
          categories: {
            data: Array<{
              id: string;
              attributes: {
                name: string;
              };
            }>;
          };
        };
      };
    };
    comments: {
      meta: {
        pagination: {
          total: number;
        };
      };
      data: Array<{
        attributes: {
          content: string;
          createdAt: string;
        };
      }>;
    };
  }

  const { data } = await client.query({
    query: POST,
    variables: {
      id: params?.postId,
      pageSize: commentsLoadPerClick,
      page: 1,
    },
  });

  const postData = data as PostData;
  const id = postData.post.data?.id || "";
  const comments = postData.comments || [];
  const { title, content, createdAt, categories } = postData.post.data
    ?.attributes || {
    title: "Post Not found",
    content: "This post doesn't existed or has been removed.",
    createdAt: Date.now(),
    categories: { data: [] },
  };
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return {
    props: {
      id: id,
      title: title,
      date: new Date(createdAt).toLocaleDateString("en-us", options),
      content: content,
      tags: categories.data.map((category) => {
        return { name: category.attributes.name, id: category.id };
      }),
      initialComments: comments.data.map((comment) => {
        return {
          content: comment.attributes.content,
          date: comment.attributes.createdAt,
        };
      }),
      totalComments: comments.meta.pagination.total,
      isPageValid: !!postData.post.data,
    },
    revalidate: 10,
  };
};

export default Post;
