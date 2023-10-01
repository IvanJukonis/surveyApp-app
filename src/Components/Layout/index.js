import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '../Header/index';

const Home = React.lazy(() => import('../Home/index'));
const Vehicle = React.lazy(() => import('../Vehicles/index'));
const Involved = React.lazy(() => import('../Involved/index'));
const OcurrenceLocation = React.lazy(() => import('../OcurrenceLocation/index'));
const InvolvedForm = React.lazy(() => import('../Involved/Form/InvolvedForm'));

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <div className={styles.mainContainer}>
          <div className={styles.asideContainer}></div>
          <div className={styles.switchContainer}>
            <React.Suspense>
              <Switch>
                <Route exact path="/vehicles" component={Vehicle} />
                <Route exact path="/involved" component={Involved} />
                <Route path="/involved/form/:id?" component={InvolvedForm} />
                <Route exact path="/ocurrenceLocation" component={OcurrenceLocation} />
                <Route exact path="/vehicles" component={Home} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default Layout;
