import { ThemesConfig } from "./types.ts";

export function themes(colors?: any): ThemesConfig {
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
}

export const prefix = "theme--";
