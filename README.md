# nanako

Yet another static site generator

## Quick start

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
![nanzhi1](./nanzhi1.jpg)
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
  }
}
```

### Deploy

```bash
yarn build

yarn start

# or

NODE_ENV=production node nanako.js
```

Ask Next.js for anything that goes wrong with deployment.
