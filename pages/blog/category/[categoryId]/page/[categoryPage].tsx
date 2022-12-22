import { GetStaticProps, GetStaticPaths } from "next";
import { gql } from "@apollo/client";
import client from "../../../../../lib/apollo-client";
import PostList from "../../../../../Components/PostList";

interface listProps {
  categoryName: string;
  categoryId: string;
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

const PostListOfCategory = (props: listProps) => {
  return (
    <PostList
      link={`/blog/category/${props.categoryId}/page/`}
      listTitle={props.categoryName}
      totalPage={props.totalPage}
      currentPage={props.currentPage}
      postPreviewData={props.postPreviewData}
    />
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const CATEGORY_ID = gql`
    query GetCategoriesId {
      categories {
        data {
          id
        }
      }
    }
  `;

  const { data: categoriesData } = await client.query({
    query: CATEGORY_ID,
  });
  const categoriesIdArray = categoriesData.categories.data;

  const TOTAL_PAGE = gql`
    query GetCategoryPageNumber($pageSize: Int!, $categoryId: ID!) {
      posts(
        filters: { categories: { id: { eq: $categoryId } } }
        pagination: { pageSize: $pageSize }
      ) {
        meta {
          pagination {
            pageCount
          }
        }
      }
    }
  `;
  const paths = [];

  for (const category of categoriesIdArray) {
    const { data } = await client.query({
      query: TOTAL_PAGE,
      variables: {
        pageSize: postsPerPage,
        categoryId: category.id,
      },
    });
    const totalPage = +data.posts.meta.pagination.pageCount;
    for (let i = 1; i <= totalPage; i++) {
      paths.push({
        params: { categoryId: category.id, categoryPage: i.toString() },
      });
    }
  }

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const POSTS = gql`
    query GetCategory($page: Int!, $pageSize: Int!, $categoryId: ID!) {
      getCategoryData: category(id: $categoryId) {
        data {
          id: id
          attributes {
            name
            posts(pagination: { page: $page, pageSize: $pageSize }) {
              data {
                id: id
                attributes {
                  title
                  content
                  createdAt
                }
              }
            }
          }
        }
      }
      getCategoryTotalPages: posts(
        filters: { categories: { id: { eq: $categoryId } } }
        pagination: { pageSize: $pageSize }
      ) {
        meta {
          pagination {
            pageCount
          }
        }
      }
    }
  `;
  interface paginationData {
    getCategoryData: {
      data: {
        id: string;
        attributes: {
          name: string;
          posts: {
            data: Array<{
              id: string;
              attributes: {
                title: string;
                content: string;
                createdAt: string;
              };
            }>;
          };
        };
      };
    };
    getCategoryTotalPages: {
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
      page: (params?.categoryPage && +params.categoryPage) || 1,
      pageSize: postsPerPage,
      categoryId: (params?.categoryId && +params.categoryId) || 1,
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
      categoryName: paginationData.getCategoryData.data.attributes.name,
      categoryId: paginationData.getCategoryData.data.id,
      totalPage:
        +paginationData.getCategoryTotalPages.meta.pagination.pageCount,
      currentPage: (params?.categoryPage && +params.categoryPage) || 1,
      postPreviewData:
        paginationData.getCategoryData.data.attributes.posts.data.map(
          (post) => {
            const { title, content, createdAt } = post.attributes;
            return {
              id: post.id,
              title,
              content: content.match(/^.+(\n|$)/),
              date: new Date(createdAt).toLocaleDateString("en-us", options),
            };
          }
        ),
    },
    revalidate: 10,
  };
};

export default PostListOfCategory;
