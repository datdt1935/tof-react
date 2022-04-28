import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const isDarkMode = (theme: Theme) => {
  return theme.palette.type === 'dark';
};

export const useLayoutStyle = makeStyles((theme: Theme) =>
  createStyles({
    bg: {
      backgroundColor: theme.palette.background.default,
    },
    bgLevel1: {
      backgroundColor: isDarkMode(theme) ? '#2b2e36' : '',
      border: isDarkMode(theme) ? 'unset' : '',
      color: isDarkMode(theme) ? '#ECEFF3' : '',
      fontFamily: 'sf_Regular',
    },
    bgHeader: {
      backgroundColor: isDarkMode(theme) ? '#32363F !important' : '',
      color: isDarkMode(theme) ? '#f6f6f6' : '',
    },

    headerButton: {
      backgroundColor: isDarkMode(theme) ? '#fff' : '#32363F',
      color: isDarkMode(theme) ? '#000' : '#fff',
    },

    textSubTitle: {
      color: isDarkMode(theme) ? '#A0A0AC' : '',
      fontFamily: 'sf_Medium',
    },

    tableContainer: {
      border: isDarkMode(theme) ? 'unset !important' : '',
    },

    tabContainer: {
      backgroundColor: isDarkMode(theme) ? '#32363F' : '#fff',
      color: isDarkMode(theme) ? '#f6f6f6' : '',
      border: isDarkMode(theme) ? 'unset !important' : '',
    },
    tabButton: {
      color: isDarkMode(theme) ? '#A0A0AC' : '',
      border: isDarkMode(theme) ? 'unset !important' : '',
    },
    tabButtonSelected: {
      color: isDarkMode(theme) ? '#18C7BC !important' : '',
    },

    formControlRoot: {
      backgroundColor: isDarkMode(theme) ? '#2b2e36' : '',
    },

    notchedOutline: {
      borderColor: isDarkMode(theme) ? 'transparent !important' : '',
    },

    groupButton: {
      backgroundColor: isDarkMode(theme) ? '#32363F' : '#efefef',
      color: isDarkMode(theme) ? '#A0A0AC' : '',
    },
<<<<<<< Updated upstream

    groupButtonPrimary: {
      backgroundColor: isDarkMode(theme) ? '#32363F' : '#efefef',
      color: isDarkMode(theme) ? '#00B8D9' : theme.palette.primary.light,
    },
=======
>>>>>>> Stashed changes
    groupButtonSelected: {
      backgroundColor: isDarkMode(theme) ? '#2D2F39 !important' : '#fff',
      border: isDarkMode(theme)
        ? '4px solid #32363F !important'
        : '4px solid #efefef !important',
      //   color: isDarkMode(theme)
      //     ? theme.palette.primary.dark
      //     : theme.palette.primary.light,
    },
<<<<<<< Updated upstream

    rowSelected: {
      backgroundColor: isDarkMode(theme)
        ? '#eceff330 !important'
        : '#cbe6ff !important',
    },
=======
>>>>>>> Stashed changes
  })
);
