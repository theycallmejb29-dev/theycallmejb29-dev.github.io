function firstLines(raw, n) {
  return String(raw || "")
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("---"))
    .slice(0, n)
    .join(" / ");
}

export default {
  layout: "layouts/poem.njk",
  tags: "poems",
  permalink: "/nazm/{{ page.fileSlug | slugify }}/",
  eleventyComputed: {
    pageTitle: (data) => data.title,
    pageDescription: (data) => {
      const open = firstLines(data.page && data.page.rawInput, 2);
      return open ? `${open} — ek nazm ${data.site.author} ki.` : data.site.description;
    },
  },
};
