import site from "./site.json" with { type: "json" };

// The deploy workflow passes the site's real address in SITE_URL, so canonical
// links, the sitemap and the RSS feed stay correct whatever the repository is
// named. A custom domain written into site.json always wins.
const strip = (u) => String(u || "").trim().replace(/\/+$/, "");

function host(u) {
  try {
    return new URL(u).hostname;
  } catch {
    return "";
  }
}

const automatic = strip(process.env.SITE_URL);
const configured = strip(site.url);
const configuredHost = host(configured);
const isDefaultHost = !configuredHost || configuredHost.endsWith(".github.io") || configuredHost.endsWith("example.com");

export default {
  url: automatic && isDefaultHost ? automatic : configured || automatic,
};
