#!/usr/bin/env node

const args = require("args");
const { createCommand, addCommand } = require("./commands");

args
  .command("create", "Create a nanako project.", createCommand, ["c"])
  .command("add", "Add a book or a chapter, or both.", addCommand, ["a"])
  .option(
    "yes",
    "Optional: skip the prompts and init the book or the chapter with the default meta.json."
  )
  .example(
    "npx nanako create my-awesome-blog",
    "Create a nanako instance in folder my-awesome-blog."
  )
  .example("npx nanako add my-awesome-book", "Create a book.")
  .example(
    "npx nanako add my-awesome-book my-awesome-chapter",
    "Create a chapter under my-awesome-book"
  );

args.parse(process.argv);
