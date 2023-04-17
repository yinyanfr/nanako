#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const ora = require("ora");
const prompts = require("prompts");
const { isNanakoRoot } = require("./lib");

// src/cli/command.js
const rootPath = path.join(__dirname, "..", "..");

const createCommand = async (name, sub, options) => {
  const target = sub?.[0] ?? ".";
  const createPath = path.resolve(target);

  const configs = {
    categories: {
      novel: "novel",
      casual: "casual",
      tutorial: "tutorial",
      uncategorized: "uncategorized",
    },
    cacheTTL: 600,
    cacheTTLLong: 3600,
  };
  const questions = [
    {
      type: "text",
      name: "title",
      message: "What is the title of your site?",
    },
    {
      type: "text",
      name: "headTitle",
      message: "What is the browser tab title of your site?",
      initial: (prev) => prev,
    },
    {
      type: "text",
      name: "footer",
      message: "What is the footer text of your site?",
    },
    {
      type: "number",
      name: "port",
      message: "Which port will your site be running on?",
    },
  ];
  if (!options?.yes) {
    try {
      const response = await prompts(questions);
      Object.keys(response).forEach((key) => {
        configs[key] = response[key];
      });
    } catch (error) {
      throw error;
    }
  }

  ["public", "src"].forEach((folder) => {
    const spinner = ora(`Copying ${folder}`).start();
    fs.cpSync(path.join(rootPath, folder), path.join(createPath, folder), {
      recursive: true,
    });
    spinner.succeed(`Success: Copying ${folder}`);
  });
  [
    ".eslintrc.json",
    "LICENSE",
    "nanako.js",
    "next-env.d.ts",
    "next.config.js",
    "package.json",
    "README.md",
    "tsconfig.json",
  ].forEach((file) => {
    const spinner = ora(`Copying ${file}`).start();
    fs.cpSync(path.join(rootPath, file), path.join(createPath, file));
    spinner.succeed(`Success: Copying ${file}`);
  });

  if (!options.yes) {
    const spinner = ora(`Writing configs`).start();
    const configPath = path.join(createPath, "src", "nanako.json");
    fs.writeFileSync(configPath, JSON.stringify(configs, null, 2));
    spinner.succeed(`Writing configs`);
  }

  console.log(`\nYour nanako project is created at ${path.resolve(target)}\n`);
  console.log("You can now run:\n");
  console.log(`\tcd ${target}`);
  console.log(`\tnpm i # or yarn`);
  console.log(`\tnpx . help`);
};

const addCommand = async (name, sub, options) => {
  const [book, chapter] = sub ?? [];
  if (!isNanakoRoot()) {
    throw new Error(
      "Please run this command at the root folder of your Nanako instance."
    );
  }
  if (!book) {
    throw new Error("Please specify the name of the book.");
  }

  const bookPath = path.resolve("docs", book);
  if (!chapter) {
    const initials = {
      title: book,
      category: "novel",
      lang: "zh-Hans",
      index: 1,
    };
    const questions = [
      {
        type: "text",
        name: "title",
        message: "What is the title of your book?",
        initial: initials.title,
      },
      {
        type: "text",
        name: "category",
        message: "What is the category of your book?",
        initial: initials.category,
      },
      {
        type: "text",
        name: "lang",
        message: "Which language (locale) is your book?",
        initial: initials.lang,
      },
      {
        type: "number",
        name: "index",
        message: "What is the index (order) of your book?",
        initial: initials.index,
      },
    ];
    const meta = options?.yes ? initials : await prompts(questions);
    fs.mkdirSync(bookPath, { recursive: true });
    fs.writeFileSync(
      path.join(bookPath, "meta.json"),
      JSON.stringify(meta, null, 2)
    );
    console.log(`Success: Your book is created at ${bookPath}`);
  } else {
    if (!fs.existsSync(bookPath)) {
      console.warn(
        `Please create the book first by using:\nnpx nanako add ${book}`
      );
      return 1;
    }
    const chapterPath = path.join(bookPath, chapter);
    const initials = {
      title: chapter,
      index: 1,
    };
    const questions = [
      {
        type: "text",
        name: "title",
        message: "What is the title of your chapter?",
        initial: initials.title,
      },
      {
        type: "number",
        name: "index",
        message: "What is the index (order) of your chapter?",
        initial: initials.index,
      },
    ];
    const meta = options?.yes ? initials : await prompts(questions);
    fs.mkdirSync(chapterPath, { recursive: true });
    fs.writeFileSync(
      path.join(chapterPath, "meta.json"),
      JSON.stringify(meta, null, 2)
    );
    console.log(`Success: Your chapter is created at ${chapterPath}`);
  }
};

module.exports = {
  createCommand,
  addCommand,
};
