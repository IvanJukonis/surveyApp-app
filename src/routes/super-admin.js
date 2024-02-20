import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import ControladoresList from 'Components/Entities/Controlador/index';
import RelevadoresList from 'Components/Entities/Relevador/index';
import AdministrativosList from 'Components/Entities/Administrativo/index';

import ControladoresCreate from 'Components/Entities/Controlador/FormControlador/ControladorForm';
import AdministrativosCreate from 'Components/Entities/Administrativo/FormAdministrativo/AdministrativoForm';
import RelevadoresCreate from 'Components/Entities/Relevador/FormRelevador/RelevadorForm';

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
        <Route path={`${url}/controlador/form`} component={ControladoresCreate} />
        <Route path={`${url}/administrativo/form`} component={AdministrativosCreate} />
        <Route path={`${url}/relevador/form`} component={RelevadoresCreate} />
        <Route path={`${url}/controlador`} component={ControladoresList} />
        <Route path={`${url}/administrativo`} component={AdministrativosList} />
        <Route path={`${url}/relevador`} component={RelevadoresList} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/siniestros`} />
      </Switch>
    </Layout>
  );
};

export default SuperAdminRoutes;
