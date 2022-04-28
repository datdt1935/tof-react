import { connect } from 'react-redux';
import { Route, Redirect, useLocation } from 'react-router-dom';
import React from 'react';
import WEB_ROUTES from 'constants/web-router';

const PrivateRoute = ({
  component: RouteComponent,
  isLogged,
  ...rest
}: any) => {
  const location = useLocation();
  const { search, pathname } = location;

  if (isLogged === 'false') {
    let parrams = '';
    if (search) {
      parrams = `&search=${encodeURIComponent(search)}`;
    }
    return (
      <Redirect
        to={`${WEB_ROUTES.LOGIN_PAGE.path}?url=${pathname}${parrams}`}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={(routeProps) => <RouteComponent {...routeProps} />}
    />
  );
};

const mapStateToProps = () => {
  const isLogged = localStorage.getItem('isLogin');
  console.log(
    '🚀 ~ file: PrivateRoute.tsx ~ line 36 ~ mapStateToProps ~ isLogged',
    isLogged
  );
  return {
    isLogged,
  };
  //   isLogged: !isEmpty(global.data.user) && !isNull(global.data.user),
};
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
