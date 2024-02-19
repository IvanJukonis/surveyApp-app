import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import SiniestrosList from '../Components/Users/Relevador/Siniestros';
import SiniestrosForm from '../Components/Entities/Siniestro/FormRelevador/SiniestroForm';
import NotAllowed from 'Components/Auth/NotAllowed';

const routes = [
  {
    name: 'Siniestros',
    path: '/controlador/siniestros',
    icon: 'calendar.svg'
  }
];

const ControladorRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/siniestros/`} component={SiniestrosList} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Route path={`${url}/siniestros/:id?`} component={SiniestrosForm} />
        <Redirect to={`${url}/siniestros`} />
      </Switch>
    </Layout>
  );
};

export default ControladorRoutes;
