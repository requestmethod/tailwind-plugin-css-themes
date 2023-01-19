import plugin from "https://esm.sh/tailwindcss@3.2.4/plugin";
import { ThemeConfig } from "https://esm.sh/tailwindcss@3.2.4/types/config.d.ts";

import {
  getTailwindCssVariables,
  getThemeTokens,
  getRgbThemeConfig,
} from "./utils.ts";

export default plugin.withOptions(
  ({
      prefix,
      themes,
    }: {
      prefix?: string;
      themes: (
        colors?: Partial<ThemeConfig["colors"]>
      ) => Record<string | number | symbol, never>;
    }) =>
    ({ addComponents, theme }) => {
      const colors = theme("colors");
      const rgbThemeConfig = getRgbThemeConfig(themes(colors), prefix);

      addComponents({
        ...rgbThemeConfig,
      });
    },
  ({ themes }) => {
    const tokens = getThemeTokens(themes());

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
