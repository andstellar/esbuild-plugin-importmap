import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

const outDir = "./_npm";

await emptyDir(outDir);

await build({
  entryPoints: ["./mod.js"],
  outDir,
  importMap: "./import_map.json",
  shims: {},
  test: false,
  packageManager: "npm",
  package: {
    name: "esbuild-plugin-importmaps",
    version: "1.0.0",
    description:
      "esbuild plugin for utilizing import maps and url imports during bundling",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/andstellar/esbuild-plugin-importmaps.git",
    },
    bugs: {
      url: "https://github.com/andstellar/esbuild-plugin-importmaps/issues",
    },
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "_npm/LICENSE");
    Deno.copyFileSync("README.md", "_npm/README.md");
  },
});
