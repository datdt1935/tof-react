import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/common/PrivateRoute';
import WEB_ROUTES from 'config/web-router';
import Login from 'pages/login';
import Dashboard from 'pages/dashboard';
import Sample from 'pages/sample';
import SensorDetail from 'pages/sensor-detail/sensor-detail.container';
import HeaderComponent from 'pages/header/header.container';

const Root: React.FC = (props) => {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route exact path={WEB_ROUTES.LOGIN_PAGE.path} component={Login} />
          <Route exact path={WEB_ROUTES.SAMPLE_PAGE.path} component={Sample} />
          <Route exact path={WEB_ROUTES.DASHBOARD.path} component={Dashboard} />
          <Route
            exact
            path={WEB_ROUTES.SENSOR_DETAIL.path}
            component={SensorDetail}
          />
        </Switch>
      </Suspense>
    </>
  );
};

export default Root;
