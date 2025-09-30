import { cookieRef } from "@layouts/stores/config";

export const resolveVuetifyTheme = (defaultTheme) => {
  const cookieColorScheme = cookieRef("color-scheme", "light");
  const storedTheme = cookieRef("theme", defaultTheme).value;

  return storedTheme === "system" ? "light" : storedTheme;
};
