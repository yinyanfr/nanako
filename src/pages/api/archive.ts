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
  const { book, chapter, archive } = req.query;
  const filename = sanitize(archive as string);
  try {
    const archivePath = path.join(
      docPath,
      book as string,
      chapter as string,
      "archives",
      filename
    );
    const stat = await fs.promises.stat(archivePath);
    res.writeHead(200, {
      "Content-Type": "application/epub+zip",
      "Content-Length": stat.size,
      "Content-Disposition": `inline; filename*=UTF-8''${encodeURI(filename)}`, // good luck with that
    });
    const readStream = fs.createReadStream(archivePath);
    readStream.pipe(res);
  } catch (error) {
    res.status(400).send(error as Error);
  }
}
