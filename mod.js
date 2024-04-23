import { ImportMap } from "@jspm/import-map";

/**
 * @param {import('@jspm/import-map').IImportMap} importmap
 *
 * @returns {import('esbuild').Plugin}
 */
export function importmapPlugin(importmap) {
  const map = new ImportMap({
    map: importmap,
  });

  return {
    name: "importmap-url",
    setup(build) {
      build.onResolve({ filter: /^[^.].*$/ }, (args) => {
        const resolvedPath = map.resolve(args.path, args.importer);

        return { path: resolvedPath, namespace: "importmap-url" };
      });

      build.onLoad(
        { filter: /.*/, namespace: "importmap-url" },
        async (args) => {
          const response = await fetch(args.path);
          const contents = await response.text();
          const ext = args.path.split(".").pop();
          const loader = /** @type {import('esbuild').Loader} */ (
            ext?.match(/"j|tsx?$/) ? ext : "js"
          );

          return { contents, loader };
        },
      );
    },
  };
}
