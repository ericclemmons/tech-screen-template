import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    includeSource: ["src/**/*.{js,ts,jsx,tsx}"], // Include source files for `import.meta.vitest`,
    setupFiles: "./tests/setup.ts",
  },
  resolve: {
    alias: {
      "@": "src",
    },
  },
});
