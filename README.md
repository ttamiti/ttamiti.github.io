# Tarikul Islam Tamiti - GitHub Pages Website

Static academic portfolio site for GitHub Pages, built from the CV.

## Files

- `index.html` - main website page
- `articles.html` - separate articles and research writing page
- `cis-bwe-chaos-informed-speech-bandwidth-extension.html` - CIS-BWE explainer article
- `hvac-ear-eavesdropping-human-speech-using-hvac-systems.html` - HVAC-EAR explainer article
- `repositories.html` - live GitHub repositories page
- `updates.html` - career and research updates feed page
- `updates.json` - editable career feed data
- `medium-drafts/cis-bwe-chaos-informed-speech-bandwidth-extension.md` - Medium-ready CIS-BWE draft
- `medium-drafts/hvac-ear-eavesdropping-human-speech-using-hvac-systems.md` - Medium-ready HVAC-EAR draft
- `style.css` - website styling
- `assets/site.js` - live repository loader and updates feed renderer
- `assets/cis-bwe-poster.jpg` - article hero image rendered from the ACL 2026 poster
- `assets/cis-bwe-*.png` - CIS-BWE architecture and subjective-result figures for the article
- `assets/hvac-ear-*.jpg` - segmented HVAC-EAR poster panels for the article
- `assets/hvac-ear-spectrogram-reconstruction.png` - HVAC-EAR spectrogram reconstruction figure
- `assets/profile-photo-edited.jpg` - edited profile photo used on the homepage
- `assets/profile-photo-edited.png` - full-quality edited profile photo source
- `assets/prof_pic.png` - previous profile photo
- `assets/Tarikul_Islam_Tamiti_CV.pdf` - downloadable CV
- `assets/favicon.svg` - simple TT favicon
- `.nojekyll` - disables Jekyll processing for predictable static hosting

## Publish on GitHub Pages

1. Create a public repository named `ttamiti.github.io`.
2. Upload these files to the repository root.
3. In GitHub, open Settings > Pages.
4. Under Build and deployment, select Deploy from a branch.
5. Choose the `main` branch and `/root`, then save.
6. The site will publish at `https://ttamiti.github.io` after GitHub finishes deployment.

## Contact Links

The website uses the contact links embedded in the CV:

- Email: `ttamiti@gmu.edu`
- GitHub: `https://github.com/ttamiti`
- Google Scholar: `https://scholar.google.com/citations?user=w7Qz_AwAAAAJ&hl=en`
- LinkedIn: `https://www.linkedin.com/in/tarik2568/`

## Updating the Career Feed

Add new career updates to `updates.json`. Each item supports:

- `date` - posting date in `YYYY-MM-DD` format
- `type` - short category, such as `Publication`, `Education`, or `Teaching`
- `title` - update headline
- `summary` - one-sentence description
- `url` - optional link

The homepage shows the three newest items. `updates.html` shows the full feed.

## Repository Page

`repositories.html` loads public repositories live from `https://github.com/ttamiti` using the GitHub public API. Public repositories will appear automatically when GitHub returns them.
