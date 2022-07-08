import fs from "fs/promises";
import path from "path";

interface Meta {
  title: string;
  index?: number;
  [key: string]: any;
}

export interface MenuPayload {
  title: string;
  pathName: string;
  index?: number;
  [key: string]: any;
  chapters: {
    title: string;
    index?: number;
    [key: string]: any;
    pathName: string;
    archives: string[];
    sections: {
      pathName: string;
      index: number;
      title: string;
    }[];
  }[];
}

export interface ContentPayload {
  title: any;
  pathName: string;
  contents: {
    content: string;
    pathName: string;
    index: number;
    title: string;
  }[];
}

async function readMeta(dirPath: string): Promise<Meta> {
  const metaReader = await fs.readFile(path.join(dirPath, "meta.json"));
  const meta = JSON.parse(metaReader.toString());
  return meta;
}

async function getArchives(
  docPath: string,
  bookName: string,
  chapterName: string
) {
  try {
    const archivePath = path.join(docPath, bookName, chapterName, "archives");
    const archives = await fs.readdir(archivePath);
    return archives;
  } catch {
    return [];
  }
}

async function getChapters(docPath: string, bookName: string) {
  const bookPath = path.join(docPath, bookName);
  const chapters = await fs.readdir(bookPath);
  const meta = await readMeta(bookPath);

  return {
    ...meta,
    chapters: chapters.filter((e) => e !== "meta.json"),
    pathName: bookName,
  };
}

async function getSections(
  docPath: string,
  bookName: string,
  chapterName: string
) {
  const chapterPath = path.join(docPath, bookName, chapterName);
  const sections = await fs.readdir(chapterPath);
  const meta = await readMeta(chapterPath);

  return {
    ...meta,
    pathName: chapterName,
    archives: await getArchives(docPath, bookName, chapterName),
    sections: sections
      .filter((e) => e.match(/\.md$/))
      .map(getSectionTitle)
      .sort((a, b) => a.index - b.index),
  };
}

function getSectionTitle(sectionName: string) {
  return {
    pathName: sectionName,
    index: parseFloat(sectionName),
    title: sectionName.replace(/\.md$/, "").replace(/^([0-9]+\.)+/, ""),
  };
}

export async function getMenu(docPath: string): Promise<MenuPayload[]> {
  const books = await fs.readdir(docPath);
  const chapters = await Promise.all(books.map((e) => getChapters(docPath, e)));
  const menu = [];
  for (const chapter of chapters) {
    menu.push({
      title: chapter.title,
      pathName: chapter.pathName,
      chapters: await Promise.all(
        chapter.chapters.map((e) => getSections(docPath, chapter.pathName, e))
      ),
    });
  }

  return menu;
}

async function readContent(
  docPath: string,
  bookName: string,
  chapterName: string,
  sectionPath: string
) {
  const sectionPathname = path.join(
    docPath,
    bookName,
    chapterName,
    sectionPath
  );
  const reader = await fs.readFile(sectionPathname);
  return reader.toString();
}

export async function getContents(
  docPath: string,
  bookName: string,
  chapterName: string
): Promise<ContentPayload> {
  const sections = await getSections(docPath, bookName, chapterName);
  const readers = await Promise.all(
    sections.sections.map((e) =>
      readContent(docPath, bookName, chapterName, e.pathName)
    )
  );
  const contents = sections.sections.map((e, i) => ({
    ...e,
    content: readers[i].toString(),
  }));
  return {
    title: sections.title,
    pathName: sections.pathName,
    contents,
  };
}
