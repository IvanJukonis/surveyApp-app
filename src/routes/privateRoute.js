import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  let role = sessionStorage.getItem('role');
  const token = sessionStorage.getItem('token');
  const error = useSelector((state) => state.auth?.error);
  return (
    <Route
      {...rest}
      render={(routeProp) => {
        if (token && role === rest.role) {
          return <RouteComponent {...routeProp} />;
        }
        if ((!role || role !== rest.role || !token) && !error) {
          switch (role) {
            case (role = 'SUPER_ADMIN'):
              return <Redirect to={'/superadmin/not-allowed'} />;
            case (role = 'CONTROLADOR'):
              return <Redirect to={'/controlador/not-allowed'} />;
            case (role = 'ADMINISTRATIVO'):
              return <Redirect to={'/administrativo/not-allowed'} />;
            case (role = 'RELEVADOR'):
              return <Redirect to={'/relevador/not-allowed'} />;
            case (role = 'CONSULTOR'):
              return <Redirect to={'/consultor/not-allowed'} />;
            default:
              <Redirect to={'/auth/login'} />;
              break;
          }
        }
        return <Redirect to={'/auth/login'} />;
      }}
    />
  );
};

export default PrivateRoute;
