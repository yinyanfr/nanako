import path from "path";
import { getContents } from "@/lib/server";
import type { NextApiRequest, NextApiResponse } from "next";

// __dirname in built file: .next/server/pages/api/menu.js
const docPath = path.join(__dirname, "..", "..", "..", "..", "docs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContentPayload | Error>
) {
  const { book, chapter } = req.query;
  try {
    const content = await getContents(
      docPath,
      book as string,
      chapter as string
    );
    res.status(200).json(content);
  } catch (error) {
    res.status(400).send(error as Error);
  }
}
