# Setup — Kavi Kehna Chahte Hain

The public poetry site of **JB**. Every poem becomes its own page with its own web
address, so Google can find and list it.

Built with [Eleventy](https://www.11ty.dev/). No database, no server — just files.

---

## Part 1 — Put the site online (do this once)

You need a free GitHub account: <https://github.com/join>. Pick a username you're
happy to have in your web address — e.g. `jbkavi` gives you `jbkavi.github.io`.

1. **Make the repository.** Go to <https://github.com/new>.
   - Repository name: `theycallmejb29-dev.github.io`
   - Set it to **Public**
   - Click **Create repository**

2. **Upload these files.** On the empty repository page click
   **uploading an existing file**, then drag in everything from this folder
   *except* `node_modules` and `_site` (those are generated).
   Click **Commit changes**.

   Two files start with a dot and your browser may quietly skip them. Check the
   file list afterwards — you should see `.pages.yml` and a `.github` folder. If
   either is missing, use **Add file → Create new file**, type the exact path
   (`.pages.yml`, or `.github/workflows/deploy.yml`), paste the content from this
   folder, and commit.

3. **Turn on GitHub Pages.** In the repository: **Settings → Pages**.
   Under *Build and deployment*, set **Source** to **GitHub Actions**.

4. Wait about two minutes. Your site is live at `https://theycallmejb29-dev.github.io`.

5. **Tell the site its own address.** Open `src/_data/site.json` in the repository,
   click the pencil icon, and change `"url"` to your real address. Commit.
   (This is what makes the sitemap, RSS and Google tags correct.)

## Part 2 — The login panel for adding poems

1. Go to <https://app.pagescms.org> and sign in with GitHub.
2. Install the Pages CMS app and give it access to this one repository.
3. Open the repository inside Pages CMS. You'll see **Nazmein** and **Site settings**.
4. **Nazmein → Add entry** gives you a form: title, date, optional note, and the
   poem itself. Save, and the site rebuilds on its own — live in about a minute.

Bookmark <https://app.pagescms.org> on your phone. That's your whole publishing setup.

## Part 3 — Getting into Google

1. Go to <https://search.google.com/search-console> and add your site address.
2. Verify ownership (the *HTML tag* method: paste the tag into
   `src/_includes/layouts/base.njk` just above `</head>`, commit, then click Verify).
3. Under **Sitemaps**, submit `sitemap.xml`.

Google usually lists a new site within a few days to a couple of weeks. It will
find you by name ("Kavi Kehna Chahte Hain", your poem titles) long before it ranks
you for common words.

## Your own domain (optional)

Buy something like `kavikehnachahtehain.com` (about ₹800–1,000/year from
Namecheap, GoDaddy or Cloudflare). Then in **Settings → Pages → Custom domain**,
enter it, and add the DNS records GitHub shows you at your registrar. Update
`"url"` in `src/_data/site.json` to match.

---

## Editing on your own computer (optional)

```bash
npm install
npm start      # http://localhost:8080, updates as you type
```

## Where things are

| Path | What it is |
| --- | --- |
| `src/poems/*.md` | One file per poem. This is what the CMS writes. |
| `src/_data/site.json` | Site name, tagline, description, address, Instagram. |
| `src/assets/style.css` | All the design. |
| `src/_includes/layouts/` | Page templates. |
| `.pages.yml` | Tells Pages CMS what the editing form looks like. |
| `.github/workflows/deploy.yml` | Rebuilds and republishes on every change. |

## A note on poem formatting

Line breaks are kept exactly as typed. A blank line starts a new stanza. You never
need to know any Markdown.
