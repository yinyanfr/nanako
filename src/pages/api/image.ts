import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import sanitize from "sanitize-filename";

// __dirname in built file: .next/server/pages/api/menu.js
const docPath = path.join(__dirname, "..", "..", "..", "..", "docs");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<File | Error>
) {
  const { book, chapter, image } = req.query;
  const filename = sanitize(image as string);
  try {
    const imagePath = path.join(
      docPath,
      book as string,
      chapter as string,
      "images",
      filename
    );
    const stat = await fs.promises.stat(imagePath);
    res.writeHead(200, {
      "Content-Type": "image/*",
      "Content-Length": stat.size,
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURI(filename)}`, // good luck with that
    });
    const readStream = fs.createReadStream(imagePath);
    readStream.pipe(res);
  } catch (error) {
    res.status(400).send(error as Error);
  }
}
