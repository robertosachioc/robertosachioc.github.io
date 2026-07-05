# Roberto Sachio Cendikiawan Personal Portfolio

**Live site:** https://robertosachioc.github.io

The personal portfolio of Roberto Sachio Cendikiawan (曾福輝). Built with plain HTML, CSS, and JavaScript. 

## Features

- Full-screen statement hero with light/dark theme toggle
- "Where I'm headed" flip cards revealing career-direction details on hover
- Experience & organization timelines with company logos
- Project cards with custom covers and PDF deliverables
- Horizontal "magazine shelf" for essays and macro briefs
- Parallax city photo band
- Working contact form — messages land in a Google Sheet and the sender gets an automatic email reply (setup: `contact-form-setup.md`)
- Fully responsive on desktop, tablet, and phone

## Structure

```
index.html      — all content lives here (edit this to change text/sections)
style.css       — all styling (colors are CSS variables at the top)
script.js       — theme toggle, mobile menu, animations, contact form
image/
  banner/            — parallax background photo
  cover/             — original project cover art
  cv/                — CV.pdf
  logo/              — company & organization logos
  personal-image/    — profile photo
  previewthumbnail/  — card thumbnails (see sizes below)
  project/           — project PDFs, one folder per project
  writing/           — essay & brief PDFs
```

## How to add content

**A new project**
1. Put the PDF in `image/project/<ProjectName>/`
2. Make a cover: **900 x 563 px JPG** -> save in `image/previewthumbnail/`
3. In `index.html`, copy the `<!-- TEMPLATE -->` block inside the Projects
   section and fill it in. Beyond 4 projects, a "See all" button appears
   automatically.

**A new essay**
1. PDF into `image/writing/`
2. Cover: **560 x 747 px JPG** (3:4) -> `image/previewthumbnail/`
3. Copy the writing `<!-- TEMPLATE -->` block in `index.html`.

**Rules of thumb**
- Keep PDFs under ~10 MB (compress before committing, GitHub rejects files over 100 MB)
- Always give new images a **new filename** (browsers cache old names)
- Use the CSS variables in `style.css` so dark mode keeps working

## Credits

- City photo: [Sean Pollock on Unsplash](https://unsplash.com/photos/low-angle-photo-of-city-high-rise-buildings-during-daytime-PhYq704ffdA)
- Fonts: [Lora](https://fonts.google.com/specimen/Lora) & [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

(c) 2026 Roberto Sachio Cendikiawan