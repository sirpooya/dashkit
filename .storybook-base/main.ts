import type { StorybookConfig } from "@storybook/react-vite"
import path from "path"

// Storybook resolves presets from its own install location, which can't see the
// project's node_modules under pnpm's global virtual store, so pass absolute paths
const getAbsolutePath = (value: string): string =>
  path.dirname(require.resolve(path.join(value, "package.json")))

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-toolbars"),
    {
      name: getAbsolutePath("@storybook/addon-essentials"),
      // Disable subpar features that create more noise than signal
      options: {
        actions: false,
        backgrounds: false,
        viewport: false,
        toolbars: false,
        measure: false,
        outline: false,
        highlight: false,
      },
    },
    {
      name: getAbsolutePath("@storybook/addon-storysource"),
      options: {
        loaderOptions: {
          prettierConfig: {
            printWidth: 90,
            useTabs: false,
            semi: false,
            tabWidth: 2,
          },
        },
      },
    },
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      savePropValueAsString: true,
      shouldRemoveUndefinedFromOptional: true,
      shouldExtractLiteralValuesFromEnum: true,
    },
  },
  framework: {
    name: getAbsolutePath("@storybook/react-vite") as "@storybook/react-vite",
    options: {
      builder: {
        viteConfigPath: "./vite.config.mjs",
      },
    },
  },
  core: {
    disableWhatsNewNotifications: true,
  },
  staticDirs: ["../public"],
  async viteFinal(finalConfig) {
    process.env.IS_STORYBOOK = "true"

    // Allow imports from `.storybook/components` directory in our MDX files
    finalConfig.resolve = finalConfig.resolve || { alias: {} }
    finalConfig.resolve.alias = {
      ...finalConfig.resolve.alias,
      "@storybookComponents": path.resolve(__dirname, "./components/"),
    }

    // https://github.com/storybookjs/storybook/issues/25256
    finalConfig.assetsInclude = ["/sb-preview/runtime.js"]

    // Storybook fails when `verbatimModuleSyntax` is true, so override the
    // compiler option specifically for this build.
    finalConfig.esbuild = finalConfig.esbuild || {}
    finalConfig.esbuild.tsconfigRaw = {
      compilerOptions: {
        verbatimModuleSyntax: false,
      },
    }

    return finalConfig
  },
}
export default config
