// vite.config.ts
import { defineConfig } from "vite";
import webExtension from "vite-plugin-web-extension";

const target = process.env.TARGET;

if (!(target === "chrome" || target === "firefox")) {
  console.log("env variable TARGET must be either 'chrome' or 'firefox'");
  throw "env variable TARGET not set to valid value";
}

export default defineConfig({
  define: {
    __BROWSER__: JSON.stringify(target),
  },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       content: "source/content.js",
  //     },
  //     output: {
  //       entryFileNames: (chunkInfo) => {
  //         if (chunkInfo.name === "content") {
  //           return "source/[name].js";
  //         }
  //       }
  //     }
  //   }
  // },
  plugins: [webExtension({
    browser: target,
  })],
});
