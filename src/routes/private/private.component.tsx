import { PUBLIC_ROUTES } from 'constants/route.constant';
import React, { useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import Routes from './private.type';

const withAuth = (Component: any) => (props: any) => {
  const isLogin = localStorage.getItem('isLogin');

  console.log('isLogin', isLogin);
  // Check Auth. If not login redirect to login page here
  if (isLogin == 'true') {
    return <Component {...props} />;
  }
  return (
    <Redirect
      to={{
        pathname: PUBLIC_ROUTES.Login,
      }}
    />
  );
};

const PrivateRoute: React.FC = () => (
  <>
    {Routes.map(({ component, ...rest }: any, i) => (
      <Route key={`key_r_p_${i}`} {...rest} component={withAuth(component)} />
    ))}
  </>
);

export default PrivateRoute;
