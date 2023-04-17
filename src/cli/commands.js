#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const ora = require("ora");
const prompts = require("prompts");

// src/cli/command.js

const createCommand = async (name, sub, options) => {
  const target = sub?.[0] ?? ".";
  const createPath = path.resolve(target);
  const rootPath = path.join(__dirname, "..", "..");

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
  console.log({ name, sub, options });
};

module.exports = {
  createCommand,
  addCommand,
};
