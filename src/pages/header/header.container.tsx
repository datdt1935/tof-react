import WEB_ROUTES from 'config/web-router';
import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {}

const HeaderComponent: React.FC<HeaderProps> = () => {
  return (
    <div>
      <Link to={WEB_ROUTES.LOGIN_PAGE.path}>{WEB_ROUTES.LOGIN_PAGE.title}</Link>
      <Link to={WEB_ROUTES.DASHBOARD.path}>{WEB_ROUTES.DASHBOARD.title}</Link>
      <Link to={WEB_ROUTES.SAMPLE_PAGE.path}>
        {WEB_ROUTES.SAMPLE_PAGE.title}
      </Link>
      <Link to={WEB_ROUTES.SENSOR_DETAIL.path}>
        {WEB_ROUTES.SENSOR_DETAIL.title}
      </Link>
    </div>
  );
};

export default HeaderComponent;
