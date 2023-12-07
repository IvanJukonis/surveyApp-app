import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styles from './layout.module.css';
import Header from '../Header/index';
import Footer from '../Footer/index';

const Home = React.lazy(() => import('../Home/index'));

//Controller
const SiniestroController = React.lazy(() => import('../Users/Relevador/Siniestros'));
const SiniestrosAdmForm = React.lazy(() =>
  import('../Entities/Siniestro/FormAdministrativo/SiniestroForm')
);
const SiniestrosRelForm = React.lazy(() =>
  import('../Entities/Siniestro/FormRelevador/SiniestroForm')
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
                <Route exact path="/administrativo/siniestros" component={SiniestroController} />
                <Route path="/controlador/siniestros/form/:id?" component={SiniestrosRelForm} />
                <Route path="/relevador/siniestros/form/:id?" component={SiniestrosRelForm} />
                <Route path="/administrativo/siniestros/form/:id?" component={SiniestrosAdmForm} />
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
