import React, { Suspense, useEffect } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import { getAuth } from 'redux/auth/thunks';
import { useDispatch } from 'react-redux';
import { tokenListener } from '../Config/firebase-config';

const SuperAdminRoutesRoutes = React.lazy(() => import('./super-admin'));
const ControladorRoutes = React.lazy(() => import('./controlador'));
const AdministrativoRoutes = React.lazy(() => import('./administrativo'));
const RelevadorRoutes = React.lazy(() => import('./relevador'));
const ConsultorRoutes = React.lazy(() => import('./consultor'));
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
          <PrivateRoute path="/superadmin" role="SUPER_ADMIN" component={SuperAdminRoutesRoutes} />
          <PrivateRoute path="/controlador" role="CONTROLADOR" component={ControladorRoutes} />
          <PrivateRoute path="/consultor" role="CONSULTOR" component={ConsultorRoutes} />
          <PrivateRoute
            path="/administrativo"
            role="ADMINISTRATIVO"
            component={AdministrativoRoutes}
          />
          <PrivateRoute path="/relevador" role="RELEVADOR" component={RelevadorRoutes} />
          <Route path="/auth" component={AuthRoute} />
          <Redirect to="/auth" component={AuthRoute} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default Routes;
