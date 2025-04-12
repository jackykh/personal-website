import { NextApiRequest, NextApiResponse } from "next";
import { authClient } from "@/lib/apollo-client";
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

  const { data } = await authClient.query({
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

const updatePostSummary = async (id: string, summary: string) => {
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

  const { data } = await authClient.mutate({
    mutation: CREATE_SUMMARY,
    variables: {
      id,
      summary,
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
  return summaryData.updatePost.data?.attributes.summary;
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
              "用戶將提供給你一段文章內容，請你分析文章內容，並提取其中的關鍵信息，並以純文本和繁體中文輸出。不要列點，需要在一段不多於200字的段落內。",
          },
          {
            role: "user",
            content: postData.content,
          },
        ],
        model: "deepseek-chat",
      });
      const AIsummary = completion.choices[0].message.content;
      if (AIsummary) {
        summary = await updatePostSummary(postId, AIsummary);
      } else {
        throw Error("AI Summary can not be provided now.");
      }
    }

    return res.json({
      summary,
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message });
    }
  }
}
