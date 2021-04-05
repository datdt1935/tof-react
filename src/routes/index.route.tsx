import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/common/PrivateRoute';
import WEB_ROUTES from 'config/web-router';
import Login from 'pages/login';
import Dashboard from 'pages/dashboard';

const Root: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading</div>}>
        <Switch>
          <Route exact path={WEB_ROUTES.LOGIN_PAGE.path} component={Login} />
          <PrivateRoute
            exact
            path={WEB_ROUTES.DASHBOARD.path}
            component={Dashboard}
          />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Suspense>
    </Router>
  );
};

export default Root;
