import { GetStaticProps, GetStaticPaths } from "next";
import { gql } from "@apollo/client";
import client from "../../../lib/apollo-client";
import PostList from "../../../Components/PostList";

interface indexListProps {
  totalPage: number;
  currentPage: number;
  postPreviewData: Array<{
    id: string;
    date: string;
    title: string;
    content: string;
  }>;
}
const postsPerPage = 5;

const indexList = (props: indexListProps) => {
  return (
    <PostList
      link="/blog/page/"
      listTitle="My Blog"
      totalPage={props.totalPage}
      currentPage={props.currentPage}
      postPreviewData={props.postPreviewData}
    />
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
  const { data } = await client.query({
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
      getPostsData: posts(pagination: { page: $page, pageSize: $pageSize }) {
        data {
          id: id
          attributes {
            title
            content
            createdAt
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

  const { data } = await client.query({
    query: POSTS,
    variables: {
      page: (params?.page && +params.page) || 1,
      pageSize: postsPerPage,
    },
  });

  const paginationData = data as paginationData;

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return {
    props: {
      totalPage: +paginationData.getTotalPages.meta.pagination.pageCount || 1,
      currentPage: (params?.page && +params.page) || 1,
      postPreviewData: paginationData.getPostsData.data.map((post) => {
        const { title, content, createdAt } = post.attributes;
        return {
          id: post.id,
          title,
          content: content.match(/^.+(\n|$)/),
          date: new Date(createdAt).toLocaleDateString("en-us", options),
        };
      }),
    },
    revalidate: 10,
  };
};

export default indexList;
