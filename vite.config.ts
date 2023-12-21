import { defineConfig } from "vite";

const GITHUB_PAGES_DEFAULT_FOLDER = "/docs";

export default defineConfig({
  build: {
    outDir: `.${GITHUB_PAGES_DEFAULT_FOLDER}`,
  },
});
