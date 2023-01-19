import { ThemeConfig } from "https://esm.sh/tailwindcss@3.2.4/types/config.d.ts";

import hexToRgb from "./hex-rgb.ts";

export function getThemeTokens(themes?: Partial<ThemeConfig["colors"]>) {
  const tokens: string[] = [];

  if (themes) {
    for (const [, value] of Object.entries(themes)) {
      if (value) {
        tokens.push(Object.keys(value));
      }
    }
  }

  console.log(Array.from(new Set(tokens.flat())));

  return Array.from(new Set(tokens.flat()));
}

export function getTailwindCssVariables(tokens) {
  return tokens.reduce((acc, token) => {
    return {
      ...acc,
      [token]: `rgb(var(--${token}) / <alpha-value>)`,
    };
  }, {});
}

export function getRgbThemeConfig(config, prefix) {
  let rgbThemeConfig = {};

  // Loop through user themes to apply theme prefix and convert hex to rgb
  for (const [userThemeName, userThemeValues] of Object.entries(config)) {
    let updatedThemeConfig = [];

    // Loop through each value of theme to convert hex to rgb
    for (const [token, hex] of Object.entries(userThemeValues)) {
      updatedThemeConfig.push([`--${token}`, hexToRgb(hex)]);
    }

    const updatedTheme = {
      [`.${prefix.concat(userThemeName)}`]: Object.fromEntries(
        new Map(updatedThemeConfig)
      ),
    };

    Object.assign(rgbThemeConfig, updatedTheme);
  }

  return rgbThemeConfig;
}
