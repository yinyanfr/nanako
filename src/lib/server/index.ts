import fs from "fs/promises";
import path from "path";
import { Converter } from "opencc-js";

async function readMeta(dirPath: string): Promise<Meta> {
  const metaReader = await fs.readFile(path.join(dirPath, "meta.json"));
  const meta = JSON.parse(metaReader.toString());
  return meta;
}

async function getArchives(
  docPath: string,
  bookPath: string,
  chapterPath: string
) {
  try {
    const archivePath = path.join(docPath, bookPath, chapterPath, "archives");
    const archives = await fs.readdir(archivePath);
    return archives;
  } catch {
    return [];
  }
}

async function getChapters(docPath: string, bookPath: string) {
  const bookCompletePath = path.join(docPath, bookPath);
  const chapters = await fs.readdir(bookCompletePath);
  const meta = await readMeta(bookCompletePath);

  return {
    ...meta,
    pathName: bookPath,
    chapters: chapters.filter((e) => e !== "meta.json"),
  };
}

async function getSections(
  docPath: string,
  bookPath: string,
  chapterPath: string
) {
  const chapterCompletePath = path.join(docPath, bookPath, chapterPath);
  const sections = await fs.readdir(chapterCompletePath);
  const meta = await readMeta(chapterCompletePath);

  return {
    ...meta,
    pathName: chapterPath,
    archives: await getArchives(docPath, bookPath, chapterPath),
    sections: sections
      .filter((e) => e.match(/\.md$/))
      .map(getSectionTitle)
      .sort((a, b) => a.index - b.index),
  };
}

function getSectionTitle(sectionPath: string) {
  return {
    pathName: sectionPath,
    index: parseFloat(sectionPath),
    title: sectionPath.replace(/\.md$/, "").replace(/^([0-9]+\.)+/, ""),
  };
}

export async function getBook(
  docPath: string,
  bookPath: string
): Promise<MenuPayload> {
  const book = await getChapters(docPath, bookPath);
  const chapters = await Promise.all(
    book.chapters.map((e) => getSections(docPath, book.pathName, e))
  );
  return {
    ...book,
    chapters,
  };
}

export async function getMenu(docPath: string): Promise<MenuPayload[]> {
  const books = await fs.readdir(docPath);
  const menu = await Promise.all(books.map((e) => getBook(docPath, e)));
  return menu;
}

async function readContent(
  docPath: string,
  bookPath: string,
  chapterPath: string,
  sectionPath: string
) {
  const sectionCompletePath = path.join(
    docPath,
    bookPath,
    chapterPath,
    sectionPath
  );
  const reader = await fs.readFile(sectionCompletePath);
  return reader.toString();
}

export async function getContents(
  docPath: string,
  bookPath: string,
  chapterPath: string
): Promise<ContentPayload> {
  const chapters = await getChapters(docPath, bookPath);
  const sections = await getSections(docPath, bookPath, chapterPath);
  const readers = await Promise.all(
    sections.sections.map((e) =>
      readContent(docPath, bookPath, chapterPath, e.pathName)
    )
  );
  const contents = sections.sections.map((e, i) => ({
    ...e,
    content: readers[i].toString(),
  }));
  return {
    bookPath: bookPath,
    bookTitle: chapters.title,
    chapterTitle: sections.title,
    chapterPath: sections.pathName,
    contents,
  };
}

export function convertMenuCC(menu: MenuPayload): MenuPayload {
  const convert = Converter({ from: "cn", to: "twp" });

  return {
    ...menu,
    title: convert(menu.title),
    chapters: menu.chapters.map((e) => ({
      ...e,
      title: convert(e.title),
      sections: e.sections.map((e) => ({
        ...e,
        title: convert(e.title),
      })),
    })),
  };
}

export function convertContentCC(content: ContentPayload): ContentPayload {
  const convert = Converter({ from: "cn", to: "twp" });

  return {
    ...content,
    bookTitle: convert(content.bookTitle),
    chapterTitle: convert(content.chapterTitle),
    contents: content.contents.map((e) => ({
      ...e,
      title: convert(e.title),
      content: convert(e.content),
    })),
  };
}
