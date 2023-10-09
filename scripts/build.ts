import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./dist");

await build({
  entryPoints: ["./src/index.ts"],
  outDir: "./dist",
  package: {
    name: "tailwind-plugin-css-themes",
    version: Deno.args[0],
    description: "Tailwind themes with CSS variables.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/requestmethod/tailwind-plugin-css-themes.git",
    },
    bugs: {
      url: "https://github.com/requestmethod/tailwind-plugin-css-themes/issues",
    },
  },
  shims: {
    deno: true,
  },
  typeCheck: false,
  postBuild() {
    Deno.copyFileSync("LICENSE", "dist/LICENSE");
    Deno.copyFileSync("README.md", "dist/README.md");
  },
});
