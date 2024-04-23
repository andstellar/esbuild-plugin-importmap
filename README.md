# esbuild-plugin-importmaps

Esbuild plugin for utilizing import maps and url imports during bundling. This
works in all modern runtimes, including browsers for use with
[esbuild-wasm](https://www.npmjs.com/package/esbuild-wasm).

## Usage

Import the plugin from `esbuild-plugin-importmaps`:

```js
import { importmapPlugin } from "esbuild-plugin-importmaps";
```

Define your importmap object:

```js
const importmap = {
  imports: {
    "preact-progressive-enhancement":
      "https://esm.sh/preact-progressive-enhancement@1.0.5",
  },
};
```

Or read it from a file:

```js
// Deno
const file = Deno.readTextFileSync("./importmap.json");

// Node
const file = fs.readFileSync("importmap.json", "utf8");

const importmap = JSON.parse(file);
```

And create your plugin for use with `esbuild`:

```js
esbuild.build({
  bundle: true,
  minify: true,
  format: "esm",
  entryPoints: ["./mod.js"],
  plugins: [fileTreePlugin, importmapPlugin(importmap)],
  write: false,
});
```

## Contributing

This package uses [chompbuild]() for task management.

Run `chomp test` to test your code.

Run `chomp package` to package your code.
