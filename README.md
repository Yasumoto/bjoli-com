# bjoli.com

Joe Smith's personal site, built with [Eleventy](https://www.11ty.dev/) 3 and deployed as a static site on Cloudflare Workers.

## Develop

Requires Node 18+.

```
npm install
npm start
```

The site is served at http://localhost:8080/. Production build:

```
npm run build
```

## Deploy

Static output lands in `_site/`. Cloudflare config is in `wrangler.jsonc`.

```
npx wrangler login
npm run deploy
```

That publishes to a `*.workers.dev` URL. Point `bjoli.com` at the Worker (custom domain in the Cloudflare dashboard) when you are ready to cut over from the current host.

## Content

- Homepage copy lives in `index.njk`.
- Posts live in `posts/` and only need the `posts` tag to appear in the archive and feeds.
- Site metadata is in `_data/metadata.json`.
