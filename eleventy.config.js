import { DateTime } from "luxon";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Single newlines inside a poem must stay newlines.
  eleventyConfig.amendLibrary("md", (md) => md.set({ breaks: true }));

  eleventyConfig.addCollection("poems", (api) =>
    api
      .getFilteredByGlob("src/poems/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("readable", (d) =>
    DateTime.fromJSDate(new Date(d), { zone: "utc" }).toFormat("d LLLL yyyy")
  );
  eleventyConfig.addFilter("isoDate", (d) =>
    DateTime.fromJSDate(new Date(d), { zone: "utc" }).toFormat("yyyy-MM-dd")
  );
  eleventyConfig.addFilter("rfc822", (d) =>
    DateTime.fromJSDate(new Date(d), { zone: "utc" }).toRFC2822()
  );
  eleventyConfig.addFilter("absolute", (path, base) =>
    new URL(path, base).toString()
  );
  eleventyConfig.addFilter("num", (n) => String(n).padStart(2, "0"));

  // Position of a poem inside the collection, and its neighbours.
  eleventyConfig.addFilter("indexIn", (collection, url) => {
    const i = (collection || []).findIndex((p) => p.url === url);
    return i < 0 ? 0 : i + 1;
  });
  eleventyConfig.addFilter("neighbour", (collection, url, offset) => {
    const list = collection || [];
    const i = list.findIndex((p) => p.url === url);
    if (i < 0) return null;
    return list[i + offset] || null;
  });

  // First two non-empty lines, for previews and meta descriptions.
  eleventyConfig.addFilter("opening", (raw, joiner) => {
    const lines = String(raw || "")
      .replace(/<[^>]+>/g, "")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    return lines.slice(0, 2).join(joiner || "  /  ");
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
