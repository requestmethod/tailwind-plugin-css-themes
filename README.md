# tailwind-plugin-css-themes

A Tailwind CSS plugin to create themes using CSS classes and variables.

# Overview

Tailwind CSS doesn't support themes by default, but they offer a "[dark mode](https://tailwindcss.com/docs/dark-mode)" feature. This is a utility for specifying dark mode styles, not creating themes. This plugin aims to simplify adding themes with semantic color names that can be updated by passing in theme CSS classes to override styles.

### Tailwind CSS "theming" with Dark Mode

```html
<!-- Card example w/ Tailwind CSS dark mode -->

<div class="bg-gray-900 dark:bg-gray p-12">
  <h3>Card w/ light theme</h3>
  <p class="text-white dark:text-black">
    This card example is styled using Tailwind color values that were set up for
    you when you installed the plugin.
  </p>
</div>
```

### Tailwind CSS theming with this plugin

```html
<!-- Card example w/ light theme -->

<div class="theme--light bg-background-primary p-12">
  <h3>Card w/ light theme</h3>
  <p class="text-white">
    This card example is styled using Tailwind color values that were set up for
    you when you installed the plugin.
  </p>
</div>
```

```html
<!-- Card example w/ dark theme -->

<div class="theme--dark bg-background-primary p-12">
  <h3>Card w/ light theme</h3>
  <p class="text-white">
    This card example is styled using Tailwind color values that were set up for
    you when you installed the plugin.
  </p>
</div>
```

This system significantly reduces CSS styling by avoiding dark classes altogether in favor of the theme classes. If you design your app using semantic color names, you can theming for free.

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

plugins: [require("tailwind-plugin-css-themes").default({})];
```

The plugin ships with a very basic light and dark theme by default. Once you add the plugin to your config, you can start using it in your HTML.

```html
<!-- Card example w/ light theme -->

<div class="theme--light bg-background-primary">
  <h3>Card w/ light theme</h3>
  <p class="text-content-primary">
    This card example is styled using Tailwind color values that were set up for
    you when you installed the plugin.
  </p>
</div>
```

## Themes

Themes are created similar to how you would [add colors to your Tailwind config](https://tailwindcss.com/docs/text-color#customizing-your-theme). Pass an object into the plugin containing a `themes` function. Create themes by returning an object of theme names containing custom color names (tokens) and values.

```js
// tailwind.config.js

plugins: [
  require("tailwind-plugin-css-themes").default({
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

<div class="theme--dark bg-background-primary p-12">
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
