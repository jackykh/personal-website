import { useState, ChangeEventHandler, useEffect, useCallback } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Footer from "@/Components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css/github-markdown-light.css";
import classes from "@/styles/Post.module.css";
import Link from "next/link";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import client from "@/lib/apollo-client";
import Navigation from "@/Components/uiComponents/Navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "@/Components/uiComponents/LoadingSpinner";
import Editor from "@/Components/uiComponents/Editor";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Head from "next/head";
import { toast } from "react-toastify";

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

const commentsLoadPerClick = 5;

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
  const [totalComments, setTotalComments] = useState(props.totalComments);

  interface reloadedCommentsData {
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

  const RELOAD_COMMENTS = gql`
    query GetComments($id: ID!, $page: Int!, $pageSize: Int!) {
      comments(
        filters: { post: { id: { eq: $id } } }
        pagination: { pageSize: $pageSize, page: $page }
        sort: "createdAt:desc"
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
  const [reloadComments, { loading: reloading, error: loadCommentsError }] =
    useLazyQuery(RELOAD_COMMENTS, {
      variables: {
        id: props.id,
        pageSize: commentsLoadPerClick * pageOfComments,
        page: 1,
      },
    });

  const reloadCommentsHandler = useCallback(async () => {
    const result = await reloadComments();
    const reloadedCommentsData = result.data as reloadedCommentsData;
    if (reloadedCommentsData) {
      const reloadedComments = reloadedCommentsData.comments.data.map(
        (comment) => {
          return {
            content: comment.attributes.content,
            date: comment.attributes.createdAt,
          };
        }
      );
      const totalCommentsNumber =
        reloadedCommentsData.comments.meta.pagination.total;
      setTotalComments(totalCommentsNumber);
      setComments(reloadedComments);
    }
  }, [reloadComments]);

  useEffect(() => {
    if (props.isPageValid) {
      reloadCommentsHandler();
    }
  }, [reloadCommentsHandler, props.isPageValid]);

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

  const [createComments, { loading: creating, error: createCommentError }] =
    useMutation(CREATE_COMMENT);

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
    setTotalComments((prevState) => prevState + 1);
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
        <h3>Comments ({totalComments})</h3>
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
        comments.map((comment, index) => (
          <div key={index} className="p-4 min-h-[5rem] border-b">
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
    comments.length < totalComments && !reloading ? (
      <button
        className="btn max-w-[15rem] text-base mt-4"
        onClick={() => {
          reloadCommentsHandler();
          setPageOfComments((prevState) => prevState + 1);
        }}
      >
        Click Here to load more.
      </button>
    ) : null;

  useEffect(() => {
    if (createCommentError || loadCommentsError) {
      const errorMessage =
        loadCommentsError?.message ||
        createCommentError?.message ||
        "Unknown Error";
      toast.error(errorMessage);
    }
  }, [createCommentError, loadCommentsError]);

  return (
    <>
      <Head>
        <title>{`${props.title} - Jacky's Blog`}</title>
        <meta
          name="description"
          content={
            props.content.match(/^[^\n]+/)?.[0] ||
            `${props.title} - Jacky's Blog`
          }
        />
      </Head>
      <Navigation />
      <main className="py-28 px-12 flex justify-center">
        <div className="flex flex-col w-[60rem] max-w-full">
          <div className="flex [&>*]:mr-4 border-b border-black py-2 text-base font-light">
            <span>{props.date}</span>
            <span>
              tag:{" "}
              {props.tags.map((tag) => (
                <Link
                  key={tag.id}
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
              rehypePlugins={[rehypeRaw as any]}
              className={`markdown-body ${classes.list_disc} !bg-transparent`}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={nightOwl}
                      PreTag="div"
                      language={match[1]}
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {props.content}
            </ReactMarkdown>
          </div>
          <div className="flex flex-col items-center">
            {commentBox}
            {button}
            {reloading && <LoadingSpinner className="mt-4" />}
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
        sort: "createdAt:desc"
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

  if (!id) {
    return {
      redirect: {
        destination: "/blog/404",
        permanent: false,
        // statusCode: 404,
      },
    };
  }

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
    revalidate: 60,
  };
};

export default Post;
