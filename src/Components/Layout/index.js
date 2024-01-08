import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '../Header/index';
import Footer from '../Footer/index';

const Home = React.lazy(() => import('../Home/index'));

//TABLES
const SiniestroController = React.lazy(() => import('../Users/Relevador/Siniestros'));
const RelevadorController = React.lazy(() => import('../Users/Administrativo/Relevadores'));
const ControladorController = React.lazy(() => import('../Users/Administrativo/Controladores'));
const VehiculoController = React.lazy(() => import('../Entities/Vehiculo'));
const InvolucradoController = React.lazy(() => import('../Entities/Involucrado'));
const LugarSiniestroController = React.lazy(() => import('../Entities/LugarSiniestro'));
const LugarRoboRuedaController = React.lazy(() => import('../Entities/LugarRoboRueda'));
const EntrevistaController = React.lazy(() => import('../Entities/Entrevista/index'));

//FORMS
const SiniestrosAdmForm = React.lazy(() =>
  import('../Entities/Siniestro/FormAdministrativo/SiniestroForm')
);
const SiniestrosRelForm = React.lazy(() =>
  import('../Entities/Siniestro/FormRelevador/SiniestroForm')
);
const RelevadorRelForm = React.lazy(() =>
  import('../Entities/Relevador/FormRelevador/RelevadorForm')
);
const ControladorRelForm = React.lazy(() =>
  import('../Entities/Controlador/FormControlador/ControladorForm')
);
const InvolucradoForm = React.lazy(() =>
  import('../Entities/Involucrado/FormInvolucrado/InvolucradoForm')
);
const NovedadForm = React.lazy(() => import('../Entities/Novedad/FormNovedad/NovedadForm'));
const VehiculoForm = React.lazy(() => import('../Entities/Vehiculo/FormVehiculo/VehiculoForm'));
const LugarSiniestroForm = React.lazy(() =>
  import('../Entities/LugarSiniestro/Form/LugarSiniestroForm')
);
const entrevistaRoboRueda = React.lazy(() =>
  import('../Entities/Entrevista/FormRoboRueda/entrevistaRoboRuedaForm')
);
const entrevistaSiniestro = React.lazy(() =>
  import('../Entities/Entrevista/FormSiniestro/entrevistaSiniestroForm')
);

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <div className={styles.mainContainer}>
          <div className={styles.switchContainer}>
            <React.Suspense>
              <Switch>
                <Route exact path="/controlador/siniestros" component={SiniestroController} />
                <Route exact path="/relevador/siniestros" component={SiniestroController} />
                <Route
                  exact
                  path="/administrativo/involucrados"
                  component={InvolucradoController}
                />
                <Route exact path="/administrativo/vehiculos" component={VehiculoController} />
                <Route
                  exact
                  path="/administrativo/lugarsiniestros"
                  component={LugarSiniestroController}
                />
                <Route
                  exact
                  path="/administrativo/lugarroboruedas"
                  component={LugarRoboRuedaController}
                />
                <Route path="/controlador/siniestros/form/:id?" component={SiniestrosRelForm} />
                <Route path="/relevador/siniestros/form/:id?" component={SiniestrosRelForm} />
                <Route path="/administrativo/siniestros/form/:id?" component={SiniestrosAdmForm} />
                <Route exact path="/administrativo/siniestros" component={SiniestroController} />
                <Route exact path="/administrativo/relevadores" component={RelevadorController} />
                <Route path="/administrativo/relevadores/form/:id?" component={RelevadorRelForm} />
                <Route
                  path="/controlador/siniestros/involucrado/form/:id?"
                  component={InvolucradoForm}
                />
                <Route
                  path="/relevador/siniestros/involucrado/form/:id?"
                  component={InvolucradoForm}
                />
                <Route path="/controlador/siniestros/novedad/form/:id?" component={NovedadForm} />
                <Route path="/relevador/siniestros/novedad/form/:id?" component={NovedadForm} />
                <Route path="/controlador/siniestros/vehiculo/form/:id?" component={VehiculoForm} />
                <Route path="/controlador/siniestros/vehiculo/form/:id?" component={VehiculoForm} />
                <Route
                  path="/controlador/siniestros/entrevista/entrevistasiniestro/:tipo/:id?"
                  component={entrevistaSiniestro}
                />
                <Route
                  path="/controlador/siniestros/entrevista/entrevistaroborueda/:tipo/:id?"
                  component={entrevistaRoboRueda}
                />
                <Route
                  path="/controlador/siniestros/lugarSiniestro/form/:id?"
                  component={LugarSiniestroForm}
                />
                <Route
                  path="/relevador/siniestros/lugarSiniestro/form/:id?"
                  component={LugarSiniestroForm}
                />
                <Route
                  exact
                  path="/administrativo/controladores"
                  component={ControladorController}
                />
                <Route
                  exact
                  path="/controlador/siniestros/entrevista/:id?"
                  component={EntrevistaController}
                />
                <Route
                  path="/administrativo/controladores/form/:id?"
                  component={ControladorRelForm}
                />
                <Route exact path="/home" component={Home} />
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </React.Suspense>
          </div>
        </div>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default Layout;
