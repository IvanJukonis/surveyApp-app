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
            case (role = 'CONTROLADOR'):
              return <Redirect to={'/controlador/not-allowed'} />;
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
