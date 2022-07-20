import path from "path";
import { getMenu } from "@/lib/server";
import type { NextApiRequest, NextApiResponse } from "next";

// __dirname in built file: .next/server/pages/api/menu.js
const docPath = path.join(__dirname, "..", "..", "..", "..", "docs");

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Record<string, MenuPayload[]> | Error>
) {
  try {
    const menu = await getMenu(docPath);
    res.status(200).json(menu);
  } catch (error) {
    res.status(400).send(error as Error);
  }
}
