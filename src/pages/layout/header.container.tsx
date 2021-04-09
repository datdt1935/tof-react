import React from 'react';

import styles from './layout.module.scss';

import WEB_ROUTES from 'config/web-router';

import { Link } from 'react-router-dom';

interface HeaderProps {}

const HeaderComponent: React.FC<HeaderProps> = () => {
  return (
    <div className={styles.header}>
      <Link to={WEB_ROUTES.LOGIN_PAGE.path}>{WEB_ROUTES.LOGIN_PAGE.title}</Link>
      <Link to={WEB_ROUTES.DASHBOARD.path}>{WEB_ROUTES.DASHBOARD.title}</Link>
      <Link to={WEB_ROUTES.SENSOR_DETAIL.path}>
        {WEB_ROUTES.SENSOR_DETAIL.title}
      </Link>
    </div>
  );
};

export default HeaderComponent;
