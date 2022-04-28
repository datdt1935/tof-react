import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import classNames from 'classnames';

import styles from './layout.module.scss';

import WEB_ROUTES from 'constants/web-router';

import { isDarkThemeMode } from 'utils/localstorage';
import { useThemesContext } from 'context/theme.context';
<<<<<<< Updated upstream
import { Tooltip } from 'components/material-ui';
=======
import { Tooltip } from 'shared/material-ui';
>>>>>>> Stashed changes

interface HeaderProps {
  styleDarkMode: any;
}

const HeaderComponent: React.FC<HeaderProps> = ({ styleDarkMode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(isDarkThemeMode());
  const { changeModeType } = useThemesContext();

  const handleChangeDarkMode = () => {
    changeModeType(!isDarkMode);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={cn(styles.header, styleDarkMode.bgHeader)}>
      <Link to={WEB_ROUTES.DASHBOARD.path}>{WEB_ROUTES.DASHBOARD.title}</Link>
      <div className={styles.space}></div>
      <Tooltip title={'Toggle light/dark theme'}>
        <div
          className={classNames(
            styles['button-icon'],
            styleDarkMode.headerButton
          )}
          onClick={handleChangeDarkMode}
        >
          <i
<<<<<<< Updated upstream
            className={classNames('fad', {
=======
            className={classNames('fal', {
>>>>>>> Stashed changes
              'fa-sun': isDarkMode,
              'fa-moon': !isDarkMode,
            })}
          ></i>
        </div>
      </Tooltip>
    </div>
  );
};

export default HeaderComponent;
