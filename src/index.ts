import plugin from "npm:tailwindcss@3.3.3/plugin";

import * as defaults from "./defaults.ts";
import { ThemesConfig } from "./types.ts";

import {
  getTailwindCssVariables,
  getThemeTokens,
  getRgbThemeConfig,
} from "./utils.ts";

interface PluginOptions {
  prefix?: string;
  themes?: (colors?: any) => ThemesConfig;
}

export default plugin.withOptions(
  (options: PluginOptions) =>
    ({ addComponents, theme }) => {
      const colors = theme("colors");

      const rgbThemeConfig = getRgbThemeConfig(
        options.themes ? options.themes(colors) : defaults.themes(colors),
        options.prefix || defaults.prefix
      );

      addComponents({
        ...rgbThemeConfig,
      });
    },
  ({ themes }) => {
    let tokens: string[];

    if (themes) {
      tokens = getThemeTokens(themes());
    } else {
      tokens = getThemeTokens(defaults.themes());
    }

    const cssVariables = getTailwindCssVariables(tokens);

    return {
      theme: {
        extend: {
          colors: {
            ...cssVariables,
          },
        },
      },
    };
  }
);
