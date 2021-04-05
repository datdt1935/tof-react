import React, { lazy } from 'react';
import { RouteProps } from 'react-router';

const Dashboard = lazy(() => import('pages/private/dashboard'));

const routes: RouteProps[] = [
  {
    exact: true,
    path: '/',
    component: Dashboard,
  },
];

export default routes;
