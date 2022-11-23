// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Message from "../../../models/Message";

type responseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<responseData>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        await Message.create(req.body);
        res.status(201).json({ success: true, message: "Sent Sucessfully!" });
      } catch (error) {
        res.status(400).json({ success: false, message: "Unknown Error" });
      }
      break;
    default:
      res.status(400).json({ success: false, message: "Unknown Error" });
      break;
  }
}
