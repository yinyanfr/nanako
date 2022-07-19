declare module "*.css";

interface Meta {
  title: string;
  index?: number;
  [key: string]: any;
}

interface MenuPayload {
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

interface ContentPayload {
  bookPath: string;
  bookTitle: string;
  chapterTitle: any;
  chapterPath: string;
  contents: {
    content: string;
    pathName: string;
    index: number;
    title: string;
  }[];
}
