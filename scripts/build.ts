import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./dist");

await build({
  entryPoints: ["./src/index.ts"],
  mappings: {
    "https://esm.sh/tailwindcss@3.2.4/plugin": {
      name: "tailwindcss",
      version: "3.2.4",
      subPath: "plugin",
    },
    "https://esm.sh/tailwindcss@3.2.4/types/config.d.ts": {
      name: "tailwindcss",
      version: "3.2.4",
      subPath: "types/config.d.ts",
    },
  },
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
  packageManager: "pnpm",
  shims: {
    deno: true,
  },
  typeCheck: false,
});

// post build steps
Deno.copyFileSync("LICENSE", "dist/LICENSE");
Deno.copyFileSync("README.md", "dist/README.md");
