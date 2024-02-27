import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import SiniestrosList from '../Components/Entities/Consultor/FormControlador/index';
import PerfilForm from '../Components/Entities/Controlador/Profile/index';

import NotAllowed from 'Components/Auth/NotAllowed';

const routes = [
  {
    name: 'Siniestros',
    path: '/controlador/siniestros',
    icon: 'calendar.svg'
  },
  {
    name: 'Perfil',
    path: '/controlador/perfil',
    icon: 'calendar.svg'
  }
];

const ControladorRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/siniestros/`} component={SiniestrosList} />
        <Route exact path={`${url}/perfil/`} component={PerfilForm} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/siniestros`} />
      </Switch>
    </Layout>
  );
};

export default ControladorRoutes;
