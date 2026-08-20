import { IdAttributePlugin, HtmlBasePlugin } from "@11ty/eleventy";
import pluginRss, { feedPlugin } from "@11ty/eleventy-plugin-rss";
import pluginSyntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginNavigation from "@11ty/eleventy-navigation";

import pluginFilters, { filterTagList } from "./_config/filters.js";
import metadata from "./_data/metadata.json" with { type: "json" };

/** @param {import("@11ty/eleventy").UserConfig} eleventyConfig */
export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("robots.txt");

  eleventyConfig.addWatchTarget("css/**/*.css");

  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
    preAttributes: { tabindex: 0 },
  });
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginFilters);
  eleventyConfig.addPlugin(IdAttributePlugin);

  eleventyConfig.addCollection("tagList", (collection) => {
    const tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });
    return filterTagList([...tagSet]);
  });

  const feedMetadata = {
    language: metadata.language,
    title: metadata.title,
    subtitle: metadata.description,
    base: metadata.url,
    author: {
      name: metadata.author.name,
      email: metadata.author.email,
    },
  };

  eleventyConfig.addPlugin(feedPlugin, {
    type: "atom",
    outputPath: "/feed/feed.xml",
    collection: {
      name: "posts",
      limit: 0,
    },
    metadata: feedMetadata,
  });

  eleventyConfig.addPlugin(feedPlugin, {
    type: "json",
    outputPath: "/feed/feed.json",
    collection: {
      name: "posts",
      limit: 0,
    },
    metadata: feedMetadata,
  });
}

export const config = {
  templateFormats: ["md", "njk", "html", "liquid"],
  markdownTemplateEngine: "njk",
  htmlTemplateEngine: "njk",
  dir: {
    input: ".",
    includes: "_includes",
    data: "_data",
    output: "_site",
  },
};
