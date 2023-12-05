import React from 'react';
import styles from './header.module.css';
import { NavLink, useLocation, useHistory } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <header>
      {location.pathname === '/relevador' ? (
        <div className={styles.header}>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/home">
              Cerrar Sesión
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="relevador/siniestros">
              Siniestros
            </NavLink>
          </div>
        </div>
      ) : location.pathname === '/controlador' ? (
        <div className={styles.header}>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/home">
              Cerrar Sesión
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="controlador/siniestros">
              Siniestros
            </NavLink>
          </div>
        </div>
      ) : location.pathname === '/administrativo' ? (
        <div className={styles.header}>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/home">
              Cerrar Sesión
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="administrativo/siniestros">
              Siniestros
            </NavLink>
          </div>
        </div>
      ) : location.pathname === '/home' ? (
        <div className={styles.header}>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/relevador">
              Relevador
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/controlador">
              Controlador
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/administrativo">
              Administrativo
            </NavLink>
          </div>
        </div>
      ) : (
        <div className={styles.header}>
          <div className={styles.homeButtons}>
            <button className={styles.buttonBack} onClick={handleGoBack}>
              Volver
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
