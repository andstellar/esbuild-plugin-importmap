import * as esbuild from "https://deno.land/x/esbuild@v0.20.1/wasm.js";
import { assertEquals } from "https://deno.land/std@0.223.0/assert/mod.ts";

import { importmapPlugin } from "./mod.js";

const importmap = {
  imports: {
    "preact-progressive-enhancement":
      "https://esm.sh/preact-progressive-enhancement@1.0.5",
  },
};

// await esbuild.initialize({
//   wasmURL: "https://esm.sh/esbuild-wasm@0.20.2/esbuild.wasm",
// });

/** @type {import('esbuild').Plugin} */
const fileTreePlugin = {
  name: "file-tree",
  setup(build) {
    build.onResolve({ filter: /^\..*$/ }, (args) => {
      console.log("resolving", args.path, args.importer);

      return { path: args.path, namespace: "file-tree" };
    });

    build.onLoad({ filter: /.*/, namespace: "file-tree" }, (args) => {
      console.log("loading", args.path);

      if (args.path === "./index.js") {
        return {
          contents:
            "import {define} from 'preact-progressive-enhancement'; console.log(define);",
          loader: "js",
        };
      }

      return undefined;
    });
  },
};

Deno.test("build test", async () => {
  const buildResult = await esbuild.build({
    bundle: true,
    minify: false,
    format: "esm",
    entryPoints: ["./index.js"],
    plugins: [fileTreePlugin, importmapPlugin(importmap)],
    write: false,
  });

  assertEquals(buildResult.errors.length, 0);
  assertEquals(buildResult.outputFiles.length, 1);
});
