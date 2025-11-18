import { GetStaticProps, GetStaticPaths } from "next";
import { gql } from "@apollo/client";
import { authClient } from "@/lib/apollo-client";
import PostList from "@/Components/PostList";
import getPreview from "@/utils/getPreview";
import Head from "next/head";
import Navigation from "@/Components/uiComponents/Navigation";
import { PostPreviewProps } from "@/Components/uiComponents/PostPreview";
import { postsPerPage } from "@/utils/constants";

interface listProps {
  categoryName: string;
  categoryId: string;
  totalPage: number;
  currentPage: number;
  postPreviewData: Array<PostPreviewProps>;
}

const PostListOfCategory = (props: listProps) => {
  return (
    <>
      <Head>
        <title>{`${props.categoryName} - Jacky's Blog`}</title>
        <meta
          name="description"
          content={`Jacky's blog sharing experiences on ${props.categoryName}`}
        />
      </Head>
      <Navigation />
      <PostList
        link={`/blog/category/${props.categoryId}/page/`}
        listTitle={props.categoryName}
        totalPage={props.totalPage}
        currentPage={props.currentPage}
        postPreviewData={props.postPreviewData}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const CATEGORY_ID = gql`
      query GetCategoriesId {
        categories {
          data {
            id
          }
        }
      }
    `;

    const { data: categoriesData } = await authClient.query({
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
      const { data } = await authClient.query({
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
  } catch (error) {
    console.error(error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const POSTS = gql`
      query GetCategory($page: Int!, $pageSize: Int!, $categoryId: ID!) {
        getCategoryData: category(id: $categoryId) {
          data {
            id: id
            attributes {
              name
              posts(
                pagination: { page: $page, pageSize: $pageSize }
                sort: "createdAt:desc"
              ) {
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

    const currentPage = params?.categoryPage && +params.categoryPage;
    const categoryId = params?.categoryId && +params.categoryId;

    // If the number-converted value of Dynamic Path are 0, NaN or "",
    // return 404 not found.
    if (!categoryId || !currentPage) {
      return {
        notFound: true,
      };
    }

    const { data } = await authClient.query({
      query: POSTS,
      variables: {
        page: currentPage,
        pageSize: postsPerPage,
        categoryId,
      },
    });

    const paginationData = data as paginationData;

    if (!data.getCategoryData.data) {
      return {
        notFound: true,
      };
    }

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
        currentPage: currentPage,
        postPreviewData:
          paginationData.getCategoryData.data.attributes.posts.data.map(
            (post) => {
              const { title, content, createdAt } = post.attributes;
              return {
                id: post.id,
                title,
                content: getPreview(content) || title,
                date: new Date(createdAt).toLocaleDateString("en-us", options),
                isPinned: false,
              };
            }
          ),
      },
      revalidate: 86400,
      // 24小時的revalidate，因為通過 Webhook 手動控制
    };
  } catch (error) {
    console.error(error);
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      },
    };
  }
};

export default PostListOfCategory;
