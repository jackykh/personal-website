import { GetStaticProps, GetStaticPaths } from "next";
import { gql } from "@apollo/client";
import { authClient } from "@/lib/apollo-client";
import PostList from "@/Components/PostList";
import getPreview from "@/utils/getPreview";
import Head from "next/head";
import Navigation from "@/Components/uiComponents/Navigation";
import isNumber from "@/utils/isNumber";
import { postsPerPage } from "@/utils/constants";

interface indexListProps {
  totalPage: number;
  currentPage: number;
  postPreviewData: Array<{
    id: string;
    date: string;
    title: string;
    content: string;
    isPinned: boolean;
  }>;
}

const indexList = (props: indexListProps) => {
  return (
    <>
      <Head>
        <title>Jacky&apos;s Blog</title>
        <meta
          name="description"
          content="Jacky's blog sharing insights on web development and personal experiences."
        />
      </Head>
      <Navigation />
      <PostList
        link="/blog/page/"
        listTitle="Jacky's Blog"
        totalPage={props.totalPage}
        currentPage={props.currentPage}
        postPreviewData={props.postPreviewData}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const TOTAL_PAGE = gql`
    query GetPostsCount($pageSize: Int!) {
      posts(pagination: { pageSize: $pageSize }) {
        meta {
          pagination {
            pageCount
          }
        }
      }
    }
  `;

  const paths = [];
  const { data } = await authClient.query({
    query: TOTAL_PAGE,
    variables: {
      pageSize: postsPerPage,
    },
  });

  const totalPage = +data.posts.meta.pagination.page;

  for (let i = 1; i <= totalPage; i++) {
    paths.push({ params: { page: i.toString() } });
  }

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const POSTS = gql`
    query GetPosts($page: Int!, $pageSize: Int!) {
      getPostsData: posts(
        pagination: { page: $page, pageSize: $pageSize }
        sort: ["sticky:asc", "createdAt:desc"]
      ) {
        data {
          id: id
          attributes {
            title
            content
            createdAt
            sticky
          }
        }
      }
      getTotalPages: posts(pagination: { pageSize: $pageSize }) {
        meta {
          pagination {
            pageCount
          }
        }
      }
    }
  `;
  interface paginationData {
    getPostsData: {
      data: Array<{
        id: string;
        attributes: {
          title: string;
          content: string;
          createdAt: string;
          sticky: string;
        };
      }>;
    };
    getTotalPages: {
      meta: {
        pagination: {
          pageCount: number;
        };
      };
    };
  }

  const currentPage = params?.page && +params.page;

  const redirectFirstPageObject = {
    redirect: {
      destination: "/blog/page/1",
      permanent: false,
      // statusCode: 301
    },
  };

  if (!currentPage) {
    return redirectFirstPageObject;
  }

  const { data } = await authClient.query({
    query: POSTS,
    variables: {
      page: currentPage,
      pageSize: postsPerPage,
    },
  });

  const paginationData = data as paginationData;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  if (paginationData.getPostsData.data.length === 0) {
    return redirectFirstPageObject;
  }

  return {
    props: {
      totalPage: +paginationData.getTotalPages.meta.pagination.pageCount || 1,
      currentPage: (params?.page && +params.page) || 1,
      postPreviewData: paginationData.getPostsData.data.map((post) => {
        const { title, content, createdAt, sticky } = post.attributes;

        return {
          id: post.id,
          title,
          content: getPreview(content) || title,
          date: new Date(createdAt).toLocaleDateString("en-us", options),
          // Not Pinned if sticky value is not Number
          isPinned: isNumber(sticky),
        };
      }),
    },
    revalidate: 86400,
    // 24小時的revalidate，因為通過 Webhook 手動控制
  };
};

export default indexList;
