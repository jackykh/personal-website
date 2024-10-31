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

interface postProps {
  id: number;
  date: string;
  title: string;
  content: string;
  tags: Array<{
    name: string;
    id: number;
  }>;
}

const Post = (props: postProps) => {
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
    },
    revalidate: 43200,
    // 12小時的revalidate，因為通過 Webhook 手動控制
  };
};

export default Post;
