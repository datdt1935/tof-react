import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from 'components/common/PrivateRoute';
import WEB_ROUTES from 'config/web-router';
import Login from 'pages/login';
import Dashboard from 'pages/dashboard';
import Sample from 'pages/sample';

const Root: React.FC = (props) => {
  return (
    <>
      <h1 onClick={() => {}}>AAA</h1>
      {/* <Router> */}
        <Suspense fallback={<div>Loading</div>}>
          <Switch>
            <Route exact path={WEB_ROUTES.LOGIN_PAGE.path} component={Login} />
            <Route
              exact
              path={WEB_ROUTES.SAMPLE_PAGE.path}
              component={Sample}
            />
            <PrivateRoute
              exact
              path={WEB_ROUTES.DASHBOARD.path}
              component={Dashboard}
            />
            {/* <Route component={NotFound} /> */}
          </Switch>
        </Suspense>
      {/* </Router> */}
    </>
  );
};

export default Root;
