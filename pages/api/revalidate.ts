import { NextApiRequest, NextApiResponse } from "next";
import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";

// This function can run for a maximum of 60 seconds
export const config = {
  maxDuration: 60,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const eventChangeEntryNumber = [
    "entry.delete",
    "entry.publish",
    "entry.unpublish",
  ];

  const postsPerPage = 5;

  const updateCatPages = async (
    categories: Array<{ id: string }>,
    postsPerPage: number
  ) => {
    const catPageCountQuery = gql`
      query getPageCount($pageSize: Int!, $categoryId: ID!) {
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

    return await Promise.all(
      categories.map(async (category: { id: string }) => {
        const { data: catPageData } = await client.query({
          query: catPageCountQuery,
          variables: {
            pageSize: postsPerPage,
            categoryId: category.id,
          },
        });
        const catPagesCount =
          +catPageData.getCategoryTotalPages.meta.pagination.pageCount;
        if (catPagesCount) {
          for (let page = 1; page <= catPagesCount; page++) {
            await res.revalidate(`/blog/category/${category.id}/page/${page}`);
          }
        }
      })
    );
  };

  try {
    if (req.body.model === "category") {
      if (eventChangeEntryNumber.includes(req.body.event)) {
        await res.revalidate(`/blog/category`);
      } else if (req.body.event === "entry.update") {
        await updateCatPages([{ id: req.body.entry.id }], postsPerPage);
      }
      return res.json({ revalidated: true, type: "category" });
    }
    if (req.body.model === "post") {
      if (req.body.event === "entry.update") {
        await res.revalidate(`/blog/post/${req.body.entry.id}`);
        return res.json({ revalidated: true, type: "post" });
      } else if (eventChangeEntryNumber.includes(req.body.event)) {
        const pagesCountQuery = gql`
          query getPageCount($pageSize: Int!) {
            getTotalPages: posts(pagination: { pageSize: $pageSize }) {
              meta {
                pagination {
                  pageCount
                }
              }
            }
          }
        `;

        const { data: mainCatPageData } = await client.query({
          query: pagesCountQuery,
          variables: {
            pageSize: postsPerPage,
          },
        });
        const pagesCount =
          +mainCatPageData.getTotalPages.meta.pagination.pageCount;

        if (pagesCount) {
          for (let page = 1; page <= pagesCount; page++) {
            await res.revalidate(`/blog/page/${page}`);
          }
        }

        await updateCatPages(req.body.entry.categories, postsPerPage);

        return res.json({
          revalidated: true,
          type: "page",
        });
      }
    }

    return res.json({
      revalidated: false,
      type: req.body.model || "Unknown",
    });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res
      .status(500)
      .json({ message: "Error revalidating", id: req.body.entry.id });
  }
}
