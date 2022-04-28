import {
  useContext,
  useState,
  createContext,
  useEffect,
  useCallback,
} from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import { isDarkThemeMode, setModeTheme, MODE_THEME } from 'utils/localstorage';

export const ThemesContext = createContext<any>(null);

const ThemesProvider = (props: any) => {
  const generateTheme = useCallback(function generateTheme() {
    return createMuiTheme({
      palette: {
        type: isDarkThemeMode() ? MODE_THEME.DARK : MODE_THEME.LIGHT,
<<<<<<< Updated upstream
        background: {
          default: isDarkThemeMode() ? '#121212' : '#eee',
          paper: isDarkThemeMode() ? '#32363F' : '#fff',
        },
=======
        background: { default: isDarkThemeMode() ? '#121212' : '#eee' },
>>>>>>> Stashed changes
        primary: {
          main: isDarkThemeMode() ? '#18c7bc' : '#3f51b5',
        },
      },
    });
  }, []);

  const [theme, setTheme] = useState<any>(generateTheme());

  useEffect(() => {
    setTheme(generateTheme());
  }, [generateTheme]);

  function changeModeType(isDarkTheme: boolean) {
    setModeTheme(isDarkTheme);
    setTheme(generateTheme());
  }

  return (
    <ThemesContext.Provider value={{ changeModeType }}>
      <ThemeProvider theme={theme} {...props} />
    </ThemesContext.Provider>
  );
};

export const useThemesContext = () => useContext<any>(ThemesContext);

export default ThemesProvider;
