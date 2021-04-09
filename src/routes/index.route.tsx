import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/common/PrivateRoute';
import WEB_ROUTES from 'config/web-router';
import Login from 'pages/login';
import SensorDetail from 'pages/sensor-configuration/sensor-configuration.component';
import LayoutComponent from 'pages/layout/layout.component';
import SensorListComponent from 'pages/sensor-list/sensor-list.component';

const Root: React.FC = (props) => {
  return (
    <>
      <LayoutComponent>
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route exact path={WEB_ROUTES.LOGIN_PAGE.path} component={Login} />
            <Route
              exact
              path={WEB_ROUTES.DASHBOARD.path}
              component={SensorListComponent}
            />
            <Route
              exact
              path={WEB_ROUTES.SENSOR_DETAIL.path}
              component={SensorDetail}
            />
          </Switch>
        </Suspense>
      </LayoutComponent>
    </>
  );
};

export default Root;
