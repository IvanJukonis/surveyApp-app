import React from 'react';
import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import SiniestrosList from '../Components/Users/Relevador/Siniestros';
import SiniestroFormCreate from '../Components/Entities/Siniestro/FormAdministrativo/SiniestroForm';
import SiniestrosForm from '../Components/Entities/Siniestro/FormRelevador/SiniestroForm';
import InvolucradosForm from '../Components/Entities/Involucrado/FormInvolucrado/InvolucradoForm';
import EntrevistaController from '../Components/Entities/Entrevista/index';
import NovedadForm from '../Components/Entities/Novedad/FormNovedad/NovedadForm';
import VehiculoForm from '../Components/Entities/Vehiculo/FormVehiculo/VehiculoForm';
import LugarSiniestroForm from '../Components/Entities/LugarSiniestro/Form/LugarSiniestroForm';
import entrevistaRoboRuedaForm from '../Components/Entities/Entrevista/FormRoboRueda/entrevistaRoboRuedaForm';
import entrevistaSiniestroForm from '../Components/Entities/Entrevista/FormSiniestro/entrevistaSiniestroForm';
import InspeccionSiniestroForm from '../Components/Entities/InspeccionSiniestro/FormInspeccionSiniestro/InspeccionSiniestroForm';
import InspeccionRoboRuedaForm from '../Components/Entities/InspeccionRoboRueda/FormInspeccionRoboRueda/InspeccionRoboRuedaForm';
import RuedaForm from '../Components/Entities/Rueda/FormRueda/RuedaForm';
import LugarRoboRuedaForm from '../Components/Entities/LugarRoboRueda/Form/LugarRoboRuedaForm';
import EventoForm from '../Components/Entities/Evento/FormEvento/EventoForm';
import ListConsultor from '../Components/Entities/Consultor/index';
import RelevadoresList from '../Components/Entities/Relevador/ListRelevador/index';
import ControladoresList from '../Components/Entities/Controlador/ListControlador/index';
import PerfilForm from '../Components/Entities/Administrativo/Profile/index';
import NotAllowed from 'Components/Auth/NotAllowed';

const routes = [
  {
    name: 'Siniestros',
    path: '/administrativo/siniestros',
    icon: 'calendar.svg'
  },
  {
    name: 'Relevadores',
    path: '/administrativo/relevador',
    icon: 'calendar.svg'
  },
  {
    name: 'Controladores',
    path: '/administrativo/controlador',
    icon: 'calendar.svg'
  },
  {
    name: 'Consultores',
    path: '/administrativo/consultor',
    icon: 'calendar.svg'
  },
  {
    name: 'Perfil',
    path: '/administrativo/perfil',
    icon: 'calendar.svg'
  },
  {
    name: 'Manual',
    path: '/administrativo/siniestros',
    icon: 'calendar.svg'
  }
];

const AdministrativoRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/siniestros/form`} component={SiniestroFormCreate} />
        <Route path={`${url}/siniestros/involucrado/form/:id?`} component={InvolucradosForm} />
        <Route path={`${url}/siniestros/vehiculo/form/:id?`} component={VehiculoForm} />
        <Route path={`${url}/siniestros/novedad/form/:id?`} component={NovedadForm} />
        <Route
          path={`${url}/siniestros/entrevista/entrevistasiniestro/:tipo/:id?`}
          component={entrevistaSiniestroForm}
        />
        <Route
          path={`${url}/siniestros/entrevista/entrevistaroborueda/:tipo/:id?`}
          component={entrevistaRoboRuedaForm}
        />
        <Route path={`${url}/siniestros/rueda/:id?`} component={RuedaForm} />
        <Route path={`${url}/siniestros/evento/:id?`} component={EventoForm} />
        <Route path={`${url}/siniestros/lugarSiniestro/form/:id?`} component={LugarSiniestroForm} />
        <Route
          path={`${url}/siniestros/inspeccionSiniestro/form/:id?`}
          component={InspeccionSiniestroForm}
        />
        <Route
          path={`${url}/siniestros/inspeccionRoboRueda/form/:id?`}
          component={InspeccionRoboRuedaForm}
        />
        <Route path={`${url}/siniestros/lugarRoboRueda/form/:id?`} component={LugarRoboRuedaForm} />
        <Route exact path={`${url}/siniestros/entrevista/:id?`} component={EntrevistaController} />
        <Route exact path={`${url}/controlador/`} component={ControladoresList} />
        <Route exact path={`${url}/relevador/`} component={RelevadoresList} />
        <Route exact path={`${url}/consultor/`} component={ListConsultor} />
        <Route exact path={`${url}/perfil/`} component={PerfilForm} />
        <Route exact path={`${url}/siniestros/`} component={SiniestrosList} />
        <Route path={`${url}/siniestros/form/:id?`} component={SiniestrosForm} />

        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/siniestros`} />
      </Switch>
    </Layout>
  );
};

export default AdministrativoRoutes;
