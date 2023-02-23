import type { APIRoute } from "astro";
import { kebabCase } from "lodash";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export const get: APIRoute = async ({ redirect, url }) => {
  const { category, title, template } = Object.fromEntries(url.searchParams);
  const source = path.resolve("src/pages", template);
  const pathname = path.join(kebabCase(category), kebabCase(title));
  const destination = path.resolve("src/pages", pathname);

  if (!source.endsWith(template)) {
    throw new Error(
      `Could not resolve template ${JSON.stringify(
        template
      )} relative to "src/pages": ${JSON.stringify(source)}`
    );
  }

  // Clone template to new folder
  await fs.cp(source, destination, { recursive: true });

  // Get template page content
  const page = `${destination}/index.mdx`;
  const raw = await fs.readFile(page, "utf-8");
  const indexOfContent = raw.indexOf("---", 4);
  const content = raw.slice(indexOfContent + 3);

  // Replace frontmatter with specified category and title
  await fs.writeFile(
    page,
    `---
    layout: "@/layouts/Syntax.astro"
    category: ${category}
    title: ${title}
    ---`
      .split("\n")
      .map((line) => line.trimStart())
      .join("\n")
      .concat(content),
    "utf-8"
  );

  // Wait for file system to catch up
  await new Promise((resolve) => {
    setTimeout(resolve, 2000);
  });

  return redirect(`/${pathname}`, 302);
};
