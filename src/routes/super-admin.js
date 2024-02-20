import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import ControladoresForm from 'Components/Entities/Controlador/index';

import NotAllowed from 'Components/Auth/NotAllowed';

const routes = [
  {
    name: 'Siniestros',
    path: '/superadmin/siniestros',
    icon: 'calendar.svg'
  },
  {
    name: 'Relevadores',
    path: '/superadmin/relevador',
    icon: 'calendar.svg'
  },
  {
    name: 'Controladores',
    path: '/superadmin/controlador',
    icon: 'calendar.svg'
  },
  {
    name: 'Administrativos',
    path: '/superadmin/administrativo',
    icon: 'calendar.svg'
  }
];

const SuperAdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route path={`${url}/controlador`} component={ControladoresForm} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/siniestros`} />
      </Switch>
    </Layout>
  );
};

export default SuperAdminRoutes;
