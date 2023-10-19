import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '../Header/index';
import Footer from '../Footer/index';

const Home = React.lazy(() => import('../Home/index'));
const Involved = React.lazy(() => import('../Involved/index'));
const InvolvedForm = React.lazy(() => import('../Involved/Form/InvolvedForm'));
const OcurrenceLocation = React.lazy(() => import('../OcurrenceLocation/index'));
const OcurrenceLocationForm = React.lazy(() =>
  import('../OcurrenceLocation/Form/OcurrenceLocationForm')
);
const Vehicle = React.lazy(() => import('../Vehicles/index'));
const VehicleForm = React.lazy(() => import('../Vehicles/Form/VehicleForm'));
const RelevadorMenu = React.lazy(() => import('../RelevadorMenu/index'));

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <div className={styles.mainContainer}>
          <div className={styles.switchContainer}>
            <React.Suspense>
              <Switch>
                <Route exact path="/involucrados" component={Involved} />
                <Route path="/involucrados/form/:id?" component={InvolvedForm} />
                <Route exact path="/lugardeocurrencia" component={OcurrenceLocation} />
                <Route path="/lugardeocurrencia/form/:id?" component={OcurrenceLocationForm} />
                <Route exact path="/vehiculo" component={Vehicle} />
                <Route path="/vehiculo/form/:id?" component={VehicleForm} />
                <Route exact path="/relevador" component={RelevadorMenu} />
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
