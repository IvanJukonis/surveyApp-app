import React, { Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import { getAuth } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { tokenListener } from '../Config/firebase-config';

const ControladorRoutes = React.lazy(() => import('./controlador'));
const AuthRoute = React.lazy(() => import('./auth'));

const Routes = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  useEffect(() => {
    tokenListener();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(getAuth(token));
    }
  }, [token]);

  return (
    <BrowserRouter>
      <Suspense fallback={<div />}>
        <Switch>
          <PrivateRoute path="/controlador" role="CONTROLADOR" component={ControladorRoutes} />
          <Route path="/auth" component={AuthRoute} />
          <Redirect to="/auth" component={AuthRoute} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
