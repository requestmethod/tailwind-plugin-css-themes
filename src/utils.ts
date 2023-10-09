import { Config as ThemeConfig } from "npm:tailwindcss@3.3.3";

import hexToRgb from "./hex-rgb.ts";
import { ThemesConfig } from "./types.ts";

export function getThemeTokens(themes): string[] {
  const tokens: string[] = [];

  if (themes) {
    for (const [, value] of Object.entries(themes)) {
      if (value) {
        tokens.push(Object.keys(value));
      }
    }
  }

  return Array.from(new Set(tokens.flat()));
}

export function getTailwindCssVariables(tokens: string[]) {
  return tokens.reduce((acc, token) => {
    return {
      ...acc,
      [token]: `rgb(var(--${token}) / <alpha-value>)`,
    };
  }, {});
}

export function getRgbThemeConfig(
  config: ThemesConfig,
  prefix: string
): ThemesConfig {
  const classString = `.`;
  const rgbThemeConfig: ThemesConfig = {};

  // Loop through user themes to apply theme prefix and convert hex to rgb
  for (const [userThemeName, userThemeValues] of Object.entries(config)) {
    const updatedThemeConfig: string[][] = [];

    // Loop through each value of theme to convert hex to rgb
    for (const [token, hex] of Object.entries(userThemeValues)) {
      if (hex) {
        updatedThemeConfig.push([`--${token}`, hexToRgb(hex)]);
      }
    }

    const updatedTheme = {
      [classString.concat(prefix, userThemeName)]: Object.fromEntries(
        new Map(updatedThemeConfig)
      ),
    };

    Object.assign(rgbThemeConfig, updatedTheme);
  }

  return rgbThemeConfig;
}
