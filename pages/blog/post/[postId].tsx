import { GetStaticProps, GetStaticPaths } from "next";
import Footer from "@/Components/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "github-markdown-css/github-markdown-light.css";
import classes from "@/styles/Post.module.css";
import Link from "next/link";
import { gql } from "@apollo/client";
import client from "@/lib/apollo-client";
import Navigation from "@/Components/uiComponents/Navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Head from "next/head";
import isNumber from "@/utils/isNumber";
import getPreview from "@/utils/getPreview";
import Giscus from "@giscus/react";
import Summary from "@/Components/uiComponents/Summary";
import { Button } from "@/Components/uiComponents/MovingBorder";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";

interface postProps {
  id: number;
  date: string;
  title: string;
  content: string;
  summary?: string;
  tags: Array<{
    name: string;
    id: number;
  }>;
}

const Post = (props: postProps) => {
  const [summary, setSummary] = useState("");
  const { data, loading, error, trigger } = useFetch();

  const generateSummary = () => {
    if (props.summary) {
      setSummary(props.summary);
    } else {
      trigger(`/api/summary?id=${props.id}`);
    }
  };

  useEffect(() => {
    if (error && error instanceof Error) {
      toast.error(error.message);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      setSummary(data.summary || "");
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{`${props.title} - Jacky's Blog`}</title>
        <meta
          name="description"
          content={getPreview(props.content) || `${props.title} - Jacky's Blog`}
        />
      </Head>
      <Navigation />
      <main className="py-28 px-12 flex justify-center">
        <div className="flex flex-col w-[60rem] max-w-full">
          <div className="flex flex-wrap gap-x-4 gap-y-1 justify-between items-end border-b border-black py-2 text-base font-light">
            <div className="flex flex-wrap gap-x-4 gap-y-1 ">
              <span>{props.date}</span>
              <span>
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

            {!summary && (
              <Button
                borderRadius="1.75rem"
                className="bg-white text-black border-neutral-200"
                onClick={generateSummary}
              >
                {loading ? (
                  <div className="flex">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-900"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    加載中
                  </div>
                ) : (
                  <span>試試 AI 摘要✨</span>
                )}
              </Button>
            )}
          </div>
          <div className="py-4 mb-12">
            <h1 className="text-3xl font-semibold mb-4">{props.title}</h1>
            <Summary content={summary} />
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
          <Giscus
            id="comments"
            repo="jackykh/blog-comments"
            repoId="R_kgDOM0EbrQ"
            category="Announcements"
            categoryId="DIC_kwDOM0Ebrc4CinA8"
            mapping="pathname"
            reactionsEnabled="1"
            emitMetadata="0"
            inputPosition="top"
            theme="light"
            lang="en"
            loading="lazy"
          />
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
    query GetPosts($id: ID!) {
      post(id: $id) {
        data {
          id: id
          attributes {
            title
            content
            createdAt
            summary
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
    }
  `;

  interface PostData {
    post: {
      data?: {
        id: number;
        attributes: {
          title: string;
          content: string;
          createdAt: string;
          summary: string;
          categories: {
            data: Array<{
              id: number;
              attributes: {
                name: string;
              };
            }>;
          };
        };
      };
    };
  }

  const paramsPostId = params?.postId as string;

  const redirect404Object = {
    redirect: {
      destination: "/blog/404",
      permanent: false,
      // statusCode: 404,
    },
  };

  if (!isNumber(paramsPostId)) {
    return redirect404Object;
  }

  const { data } = await client.query({
    query: POST,
    variables: {
      id: paramsPostId,
    },
  });

  const postData = data as PostData;
  const id = postData.post.data?.id;

  if (!id) {
    return redirect404Object;
  }

  const { title, content, createdAt, categories, summary } = postData.post.data
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
      id,
      title,
      date: new Date(createdAt).toLocaleDateString("en-us", options),
      content,
      summary,
      tags: categories.data.map((category) => {
        return { name: category.attributes.name, id: category.id };
      }),
    },
    revalidate: 86400,
    // 24小時的revalidate，因為通過 Webhook 手動控制
  };
};

export default Post;
