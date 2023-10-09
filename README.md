# tailwind-plugin-css-themes

A Tailwind CSS plugin to create themes using CSS classes and variables.

# Overview

Tailwind offers a "[dark mode](https://tailwindcss.com/docs/dark-mode)" feature, but that's not a true design system theme. CSS variable theming simplifies color management and developer experience by mapping semantic color names to existing design system color scales. Changing a theme becomes as simple as changing one CSS classes.

### Tailwind CSS "theming" with Dark Mode

```html
<!-- Card example w/ Tailwind CSS dark mode -->

<div class="bg-gray-900 dark:bg-gray-100 p-12">
  <h3 class="text-white dark:text-black">Card w/ light theme</h3>
  <p class="text-white/70 dark:text-black/70">
    This card example is styled using Tailwind's default color values with dark
    utility classes to modify the colors for dark mode.
  </p>
  <button class="text-blue-600 dark:text-blue-400">Action text</button>
</div>
```

In the "dark mode" approach, every color class needs a `dark:` color class, resulting in twice the number of classes across your entire code base.

### Tailwind CSS theming with this plugin

```html
<!-- Card example w/ light theme -->

<div class="theme--light bg-background-primary p-12">
  <h3 class="text-content-primary">Card w/ light theme</h3>
  <p class="text-content-secondary">
    This card example is styled using Tailwind color values that were set up for
    you when you installed the plugin.
  </p>
  <button class="text-action">Action text</button>
</div>
```

```html
<!-- Card example w/ dark theme -->

<div class="theme--dark bg-background-primary p-12">
  <h3 class="text-content-primary">Card w/ light theme</h3>
  <p class="text-content-secondary">
    This card example is styled using Tailwind color values that were set up for
    you when you installed the plugin.
  </p>
  <button class="text-action">Action text</button>
</div>
```

In the theme approach, we avoid `dark:` classes altogether in favor of the semantic theme class names with a single theme class to define the color mapping. The 2 components above share the same HTML, but the theme class name on the parent div sets the right theme values for all of the nested semantic class names.

Here's the same example in React TypeScript:

```tsx
function Card({ theme }: { theme: "theme--light" | "theme--dark" }) {
  return (
    <div className={`${themeClass} p-12 bg-background-primary`}>
      <h3 className="text-content-primary">Card w/ {theme} theme</h3>
      <p className="text-content-secondary">
        This card example is styled using Tailwind color values that were set up
        for you when you installed the plugin.
      </p>
      <button className="text-action">Action text</button>
    </div>
  );
}

<!-- Card example w/ light theme -->
<Card theme="theme--light" />

<!-- Card example w/ dark theme -->
<Card theme="theme--dark" />

```

# Usage

## Installation

This installation assumes you have already installed Tailwind CSS in your project. See the [official Tailwind CSS docs](https://tailwindcss.com/docs/installation) for more information.

### Install plugin

```shell
npm install -D tailwind-plugin-css-themes
```

**Note: `tailwindcss` is a peer dependency, so you need to have it installed.**

### Add the plugin to your Tailwind config

```js
// tailwind.config.js

// commonjs
plugins: [require("tailwind-plugin-css-themes")({})];

// esm
import tailwindPluginCssThemes from "tailwind-plugin-css-themes";

plugins: [tailwindPluginCssThemes({})];
```

The plugin ships with a very basic light and dark theme by default. Once you add the plugin to your config, you can start using it in your HTML.

```html
<!-- Card example w/ dark theme -->

<div class="theme--dark bg-background-primary p-12">
  <h3 class="text-content-primary">Card w/ light theme</h3>
  <p class="text-content-secondary">
    This card example is styled using Tailwind color values that were set up for
    you when you installed the plugin.
  </p>
  <button class="text-action">Action text</button>
</div>
```

## Themes

Themes are created similar to how you would [add colors to your Tailwind config](https://tailwindcss.com/docs/text-color#customizing-your-theme). Pass an object into the plugin containing a `themes` function. Create themes by returning an object of theme names containing custom color names (tokens) and values.

```js
// tailwind.config.js

plugins: [
  tailwindPluginCssThemes({
    themes: (colors) => {
      return {
        light: {
          "background-primary": colors?.zinc[100],
          "background-secondary": colors?.zinc[200],
          "content-primary": colors?.zinc[900],
          "content-secondary": colors?.zinc[700],
          accent: colors?.indigo[600],
        },
        dark: {
          "background-primary": colors?.zinc[900],
          "background-secondary": colors?.zinc[800],
          "content-primary": colors?.zinc[100],
          "content-secondary": colors?.zinc[300],
          accent: colors?.indigo[400],
        },
      };
    },
  }),
];
```

Behind the scenes, the plugin turns your themes into [Tailwind component styles](https://tailwindcss.com/docs/adding-custom-styles#adding-component-classes), which lets us apply the themes using CSS classes. The resulting CSS looks like this:

```css
.theme--light {
  --background-primary: 244 244 245;
  --background-secondary: 228 228 231;
  --content-primary: 24 24 27;
  --content-secondary: 63 63 70;
  --accent: 99 102 241;
}
.theme--dark {
  --background-primary: 24 24 27;
  --background-secondary: 39 39 42;
  --content-primary: 244 244 245;
  --content-secondary: 212 212 216;
  --accent: 129 140 248;
}
```

Notice that the plugin prefixes your theme names with `.theme--`. This is simply a convention to prevent class name conflicts. You can change it by passing a `prefix` string into the plugin options.

We also convert the color values to RGB to ensure that Tailwind's text opacity modifiers remain working.

```html
<!-- Using color tokens with opacity -->

<div class="theme--dark bg-background-primary/80 p-12">
  <p class="text-content-primary/60">
    This text would be displayed in the text-content-primary color at 60%
    opacity.
  </p>
</div>
```

# Development

This package is written in TypeScript and uses [dnt](https://github.com/denoland/dnt) (Deno to Node Transform) to build the package for NPM.

### Install deno

See the [official deno installation guide](https://deno.land/manual@v1.29.4/getting_started/installation).

### Build package locally in TypeScript, ESM, CJS

```shell
deno run -A scripts/build.ts
```

---

■ ■ ■ □
