const APP_ID = 'Xoontec_Tof';

export enum MODE_THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

const THEME = `${APP_ID}_THEME_MODE`;

export function getModeTheme(): string {
  return localStorage.getItem(THEME) || MODE_THEME.DARK;
}

export function isDarkThemeMode(): boolean {
  return getModeTheme() === MODE_THEME.DARK;
}

export function setModeTheme(isDarkTheme: boolean) {
  localStorage.setItem(THEME, isDarkTheme ? MODE_THEME.DARK : MODE_THEME.LIGHT);
}
