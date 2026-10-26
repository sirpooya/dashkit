import { homedir } from "node:os"
import { resolve } from "node:path"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig(async () => {
  const { default: tsconfigPaths } = await import("vite-tsconfig-paths")

  return {
    cacheDir: resolve(homedir(), "Library/Caches/vite/dashkit"),
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    plugins: [react(), tsconfigPaths({ root: __dirname })],
    test: {
      environment: "happy-dom",
      setupFiles: ["./happydom.ts", "./testing-library.ts", "./test/setupTests.ts"],
      include: [
        "src/**/*.test.{ts,tsx}",
        "test/**/*.test.{ts,tsx}",
        "postcss/**/*.test.{js,mjs,ts}",
      ],
    },
  }
})
