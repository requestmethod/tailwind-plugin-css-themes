import { assertEquals } from "https://deno.land/std/assert/mod.ts";

import {
  getRgbThemeConfig,
  getTailwindCssVariables,
  getThemeTokens,
} from "./utils.ts";

Deno.test("getThemeTokens: returns array of tokens", () => {
  const tokens = getThemeTokens({
    dark: {
      "background-primary": "#000000",
      "text-primary": "#ffffff",
    },
  });

  assertEquals(tokens, ["background-primary", "text-primary"]);
});

Deno.test(
  "getTailwindCssVariables: converts rgba theme to tailwind css variable theme",
  () => {
    const theme: {
      [key: string]: {
        [key: string]: string;
      };
    } = {
      dark: {
        "background-primary": "#000000",
        "text-primary": "#ffffff",
      },
    };
    const prefix = "test-theme--";

    const rgbTheme = getRgbThemeConfig(theme, prefix);

    assertEquals(rgbTheme, {
      ".test-theme--dark": {
        "--background-primary": "0 0 0",
        "--text-primary": "255 255 255",
      },
    });
  }
);

Deno.test(
  "getTailwindCssVariables: returns prefixed, css variable theme with rgb color values",
  () => {
    const tokens = ["background-primary", "text-primary"];

    const cssVariableTokens = getTailwindCssVariables(tokens);

    assertEquals(cssVariableTokens, {
      "background-primary": `rgb(var(--background-primary) / <alpha-value>)`,
      "text-primary": `rgb(var(--text-primary) / <alpha-value>)`,
    });
  }
);
