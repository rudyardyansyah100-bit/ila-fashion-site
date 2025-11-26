# IlaFashion - Static-ready Next.js site

This package was prepared automatically for you. To publish the site:

1. Install:
   - Node 18+ recommended
   - npm install

2. Run locally:
   npm run dev
   open http://localhost:3000

3. When ready, push to GitHub and deploy to Vercel (connect GitHub repo). Follow Vercel's import flow.

4. After deploy, update `public/sitemap.xml` and `public/robots.txt` to use your real domain:
   Replace `https://yourdomain.com/` with your real URL.

Images included (placed in `public/assets/products/`):
- gamis-denim.jpg, gamis-latte.jpg, gamis-sage.jpg, workshop.jpg

Notes:
- Tailwind is configured via `tailwind.config.js` and `app/globals.css`. If you prefer plain CSS, remove Tailwind references.
- This project uses Next.js app-router and `next/image`. Ensure Next.js version supports `app` directory.
