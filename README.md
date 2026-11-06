# DG website — how to edit

This folder is the whole website. Everything runs straight from these files, with no build step.

## Change, add or remove a project
Open `js/projects.js`. It has plain-English instructions at the top. Each project is one block:

```js
{
  slug: 'mattel-rc-cybertruck', client: 'Mattel', title: 'RC Cybertruck',
  type: 'Branded', year: 2020, image: 'rc-cybertruck',
  videos: [{ id: '423057471' }]
},
```

- **Video:** the number at the end of the Vimeo link (`vimeo.com/423057471` → `423057471`).
  Private links look like `vimeo.com/1140817686/cc030c2d81`. The second part goes in `hash`.
- **Image:** put two copies in `img/`: `name.jpg` (about 2000px wide) and `name-sm.jpg` (about 900px wide).
  Use `name` (without `.jpg`) for `image`.
- **Order:** the order of the blocks is the order on the site.

## Change the bio
Open `index.html` and search for `BIO:`. Replace the paragraph under it.

## Share a single video
Every video has its own link: `https://www.dgthings.com/#watch/<slug>`.
The **Share** button in the video player copies that link.

## Keyboard shortcuts
↑ ↓ move between projects · I opens the index · ← → change video in the player · Esc closes.

## Files
| File | What it is |
|---|---|
| `index.html` | the page |
| `css/site.css` | colors, fonts and layout |
| `js/projects.js` | the project list and contact details |
| `js/site.js` | how the page behaves (you shouldn't need to touch this) |
| `img/` | all images, plus `og.jpg` (the preview when the link is shared) |
| `404.html`, `robots.txt`, `sitemap.xml`, `favicon.svg` | standard website files |
