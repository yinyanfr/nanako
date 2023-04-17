#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

function isNanakoRoot() {
  return fs.existsSync(path.resolve("nanako.js"));
}

module.exports = {
  isNanakoRoot,
};
