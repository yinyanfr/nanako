# nanako

[![npm](https://img.shields.io/npm/v/nanako.svg?style=flat-square)](https://www.npmjs.com/package/nanako)
![react](https://img.shields.io/npm/dependency-version/nanako/react?style=flat-square)
![next](https://img.shields.io/npm/dependency-version/nanako/next?style=flat-square)
![license](https://img.shields.io/npm/l/nanako.svg?style=flat-square)
![size](https://img.shields.io/github/repo-size/yinyanfr/nanako?style=flat-square)

Yet another static site generator.

## :star2: Features

- Designed for light novels
- CLI tools
- Sync tool (TODO)

## :green_book: Quick start

```bash
npx nanako create my-awesome-blog
```

## :wrench: CLI

```bash
Usage: nanako [options] [command]

Commands:
  add, a     Add a book or a chapter, or both.
  create, c  Create a nanako project.
  help       Display help
  version    Display version

Options:
  -h, --help     Output usage information
  -v, --version  Output the version number
  -y, --yes      Optional: skip the prompts and init the book or the chapter with the default meta.json.

Examples:
  - Create a nanako instance in folder my-awesome-blog.
  $ npx nanako create my-awesome-blog

  - Create a book.
  $ npx nanako add my-awesome-book

  - Create a chapter under my-awesome-book
  $ npx nanako add my-awesome-book my-awesome-chapter
```

## :books: Manual Content Management

### Putting your docs

```
docs
└─ lixia  // book
   ├─ chapter2  // chapter
   │  ├─ 1.md
   │  └─ meta.json
   ├─ intro
   │  ├─ archives
   │  │  ├─ 立夏序章简.epub
   │  │  └─ 立夏序章繁.epub
   │  ├─ images
   │  │  ├─ alice.jpg
   │  │  ├─ nanzhi1.jpg
   │  │  ├─ nanzhi2.jpg
   │  │  ├─ yuyao1.jpg
   │  │  ├─ yuyao2.jpg
   │  │  └─ yuyao3.jpg
   │  ├─ 1.md
   │  ├─ 10.md
   │  ├─ 11.md
   │  ├─ 12.md
   │  ├─ 13.md
   │  ├─ 14.尾声.md
   │  ├─ 15.后记.md
   │  ├─ 2.md
   │  ├─ 3.md
   │  ├─ 4.md
   │  ├─ 5.md
   │  ├─ 6.md
   │  ├─ 7.md
   │  ├─ 8.md
   │  ├─ 9.md
   │  └─ meta.json
   └─ meta.json
```

### Creating `meta.json` for books and chapters

```json
{
  "title": "立夏",
  "lang": "zh-Hans",
  "index": 1,
  "category": "novel"
}
```

### Using images in markdown

```markdown
![nanzhi1](./images/nanzhi1.jpg)
```

Will automatically redirect to `/images/nanzhi1.jpg`

### Modify `src/nanako.json`

```json
{
  "port": 20200,
  "footer": "对于本网站及展示的作品，作者保留一切权力。",
  "title": "小喵新姬的博客",
  "headTitle": "咕噜咕噜喵儿",
  "cookieConsent": true,
  "categories": {
    "novel": "小说",
    "casual": "随笔",
    "tutorial": "教程",
    "uncategorized": "未分类"
  },
  "cacheTTL": 600, // cache ttl for chapters fetch
  "cacheTTLLong": 3600 // cache ttl for books and sections fetch
}
```

## :rocket: Deployment

```bash
yarn build

yarn start

# or

NODE_ENV=production node nanako.js
```

Please refer to the [Next.js documentations](https://nextjs.org/docs) for anything that goes wrong with deployment.
