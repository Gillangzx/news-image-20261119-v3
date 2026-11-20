# The Day, Explained — news-image-20261119

[![make.fun](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/Gillangzx/news-image-20261119-v3/rank.svg)](https://make.fun/bounty/news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/Gillangzx/news-image-20261119-v3/reward.svg)](https://make.fun/bounty/news-image-20261119)

A one-page newspaper front page for **Thursday 19 November 2026**: 40 stories from
that single day, every one verified against the day's reporting. The three big
stories — the first Trump–Xi–Putin three-way summit in Shenzhen, the World
Court's 9–6 genocide ruling on Myanmar, and Anthropic's record $81.3bn IPO —
lead the page, each with a **SO WHAT** line: not just what happened, but what it
means. Every tile carries a short consequence phrase, and the page closes with a
dotted world map, the remaining 27 briefs, and a DATE CHECK that names the
other days' news left out on purpose.

Entry for the [news-image-20261119 bounty on make.fun](https://make.fun/bounty/news-image-20261119).

## How it works

`main.ts` (Node 22, standard library only) copies the pre-rendered `entry.png`
beside it to `$MAKEFUN_OUTPUT_DIR/entry.png`. The image itself is drawn in
code — `render.html` is the page (HTML + inline SVG illustrations and a
dotted world map generated from a land bitmap), rendered to `entry.png` at
1024×1024 with headless Chromium via `render.mjs` (development only; the
grader never renders, it only copies).

## Files

- `entry.png` — the entry image, 1024×1024
- `main.ts` — entrypoint: copies `entry.png` to the output directory
- `render.html` — the front page source (layout, text, SVG art, dotted map)
- `render.mjs` — development renderer (Playwright + Chromium → `entry.png`)
