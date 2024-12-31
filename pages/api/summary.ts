import { NextApiRequest, NextApiResponse } from "next";
import { blogUpdatingClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import isNumber from "@/utils/isNumber";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_APIKEY,
});

// This function can run for a maximum of 60 seconds
export const config = {
  maxDuration: 60,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const postId =
      !Array.isArray(req.query.id) && isNumber(req.query.id) && req.query.id;
    if (!postId) {
      return res.status(404).json({ message: "Post Not found." });
    }

    const getPostData = async (id: string) => {
      const GET_CONTENT = gql`
        query GetPostContent($id: ID!) {
          post(id: $id) {
            data {
              attributes {
                content
                summary
              }
            }
          }
        }
      `;

      interface PostContent {
        post: {
          data?: {
            attributes: {
              content: string;
              summary: string;
            };
          };
        };
      }

      const { data } = await blogUpdatingClient.query({
        query: GET_CONTENT,
        variables: {
          id,
        },
      });

      const postData = data as PostContent;
      const content = postData.post.data?.attributes.content;
      const summary = postData.post.data?.attributes.summary;
      return { content, summary };
    };
    const postData = await getPostData(postId);
    if (!postData.content) {
      return res.status(404).json({ message: "Post Not found." });
    }
    let summary = postData.summary;
    if (!summary) {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "用戶將提供給你一段文章內容，請你分析文章內容，並提取其中的關鍵信息，並以純文本和繁體中文輸出，需要不多於200字。",
          },
          {
            role: "user",
            content: postData.content,
          },
        ],
        model: "deepseek-chat",
      });
      const AIsummary = completion.choices[0].message.content;
      const CREATE_SUMMARY = gql`
        mutation createSummary($id: ID!, $summary: String!) {
          updatePost(id: $id, data: { summary: $summary }) {
            data {
              id
              attributes {
                summary
              }
            }
          }
        }
      `;

      const { data } = await blogUpdatingClient.mutate({
        mutation: CREATE_SUMMARY,
        variables: {
          id: postId,
          summary: AIsummary,
        },
      });
      interface PostSummary {
        updatePost: {
          data?: {
            id: string;
            attributes: {
              summary: string;
            };
          };
        };
      }
      const summaryData = data as PostSummary;
      summary = summaryData.updatePost.data?.attributes.summary;
    }

    if (summary) {
      return res.json({
        summary,
      });
    }
    return res.status(404).json({ message: "Post Data Not found." });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
}
