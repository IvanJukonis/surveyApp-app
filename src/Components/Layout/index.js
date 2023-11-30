import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '../Header/index';
import Footer from '../Footer/index';

const Home = React.lazy(() => import('../Home/index'));

//Controller
const InvestigatorController = React.lazy(() => import('../Users/Controller/Investigators'));
const VehicleController = React.lazy(() => import('../Users/Controller/Vehicles'));
const LocationController = React.lazy(() => import('../Users/Controller/Locations'));
const InvolvedController = React.lazy(() => import('../Users/Controller/Involved'));
const SiniestroController = React.lazy(() => import('../Users/Investigator/Siniestros'));

const InvestigatorControllerForm = React.lazy(() =>
  import('../Investigator/Form/InvestigatorForm')
);
const VehicleControllerForm = React.lazy(() => import('../Vehicle/Form/VehicleForm'));
const LocationControllerForm = React.lazy(() => import('../Location/Form/LocationForm'));
const InvolvedControllerForm = React.lazy(() => import('../Involved/Form/InvolvedForm'));
const SiniestrosForm = React.lazy(() => import('../Siniestro/Form/SiniestroForm'));

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <div className={styles.mainContainer}>
          <div className={styles.switchContainer}>
            <React.Suspense>
              <Switch>
                <Route exact path="/controlador/siniestros" component={InvolvedController} />
                <Route exact path="/controlador/relevadores" component={InvestigatorController} />
                <Route exact path="/controlador/vehiculos" component={VehicleController} />
                <Route exact path="/controlador/lugardeocurrencia" component={LocationController} />
                <Route exact path="/controlador/involucrados" component={InvolvedController} />
                <Route exact path="/controlador/fraudes" component={InvolvedController} />
                <Route exact path="/controlador/relevamientos" component={InvolvedController} />
                <Route exact path="/controlador/siniestros" component={SiniestroController} />
                <Route exact path="/relevador/siniestros" component={SiniestroController} />
                <Route
                  path="controlador/relevadores/form/:id?"
                  component={InvestigatorControllerForm}
                />
                <Route path="/relevador/siniestros/form/:id?" component={SiniestrosForm} />
                <Route path="controlador/vehiculos/form/:id?" component={VehicleControllerForm} />
                <Route
                  path="controlador/involucrados/form/:id?"
                  component={InvolvedControllerForm}
                />
                <Route
                  path="controlador/lugardeocurrencia/form/:id?"
                  component={LocationControllerForm}
                />

                <Route exact path="/home" component={Home} />
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </React.Suspense>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
