import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import ThemeProvider from 'context/theme.context';
import SnackbarProvider from 'context/notification.context';

import WEB_ROUTES from 'constants/web-router';
import LayoutComponent from 'pages/layout/layout.component';

const SensorDetail = lazy(
  () => import('pages/sensor-configuration/sensor-configuration.component')
);
const SensorListComponent = lazy(
  () => import('pages/sensor-list/sensor-list.component')
);

const Root: React.FC = () => {
  return (
    <ThemeProvider>
      <SnackbarProvider>
        <LayoutComponent>
          <Suspense fallback={<div>Loading</div>}>
            <Switch>
              <Route
                exact
                path={WEB_ROUTES.DASHBOARD.path}
                component={SensorListComponent}
              />
              <Route
                path={WEB_ROUTES.SENSOR_DETAIL.path}
                component={SensorDetail}
              />
            </Switch>
          </Suspense>
        </LayoutComponent>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Root;
