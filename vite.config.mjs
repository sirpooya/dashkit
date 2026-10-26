import react from "@vitejs/plugin-react"

import { homedir } from "node:os"
import { resolve } from "node:path"
import { searchForWorkspaceRoot } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

/**
 * @type {import('vite').UserConfig}
 */
export default {
  root: ".",
  // Keep the dep cache out of the repo; packages are symlinks into the global pnpm store
  cacheDir: resolve(homedir(), "Library/Caches/vite/dashkit"),
  server: {
    fs: {
      allow: [searchForWorkspaceRoot(process.cwd()), resolve(homedir(), "Library/pnpm/store")],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [react(), tsconfigPaths({ root: __dirname })],
}
