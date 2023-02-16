import image from "@astrojs/image";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    mdx({
      shikiConfig: {
        theme: "css-variables",
      },
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    image({
      serviceEntryPoint: "@astrojs/image/sharp",
    }),
  ],
});
