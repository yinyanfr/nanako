import path from "path";
import type { ContentPayload } from "@/lib";
import { getContents } from "@/lib";
import type { NextApiRequest, NextApiResponse } from "next";

// __dirname in built file: .next/server/pages/api/menu.js
const docPath = path.join(__dirname, "..", "..", "..", "..", "docs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentPayload | Error>
) {
  const { book, chapter } = req.query;
  try {
    const menu = await getContents(docPath, book as string, chapter as string);
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).send(error as Error);
  }
}
