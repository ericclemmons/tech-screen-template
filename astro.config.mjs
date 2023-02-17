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
  server: {
    headers: {
      // 👇 `credentialless` is the trick to get both WebContainers & CORS images to both load
      // See: https://developer.chrome.com/blog/coep-credentialless-origin-trial/#credentialless-to-the-rescue
      "Cross-Origin-Embedder-Policy": "credentialless",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
});
