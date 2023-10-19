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
            <NavLink className={styles.textList} to="/menu">
              Menu
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/siniestros">
              Siniestros
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/manual">
              Manual
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/perfil">
              Perfil
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
            <NavLink className={styles.textList} to="/relevamientos">
              Relevamientos
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/fraudes">
              Fraudes
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/involucrados">
              Involucrados
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/vehiculos">
              Vehiculos
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/relevadores">
              Relevadores
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/siniestros">
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
            <NavLink className={styles.textList} to="/facturacion">
              Facturacion
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/avisos">
              Avisos
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/variables">
              Variables
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/recursoshumanos">
              Recursos Humanos
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/contabilidad">
              Contabilidad
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/manuales">
              Manuales
            </NavLink>
          </div>
          <div className={styles.homeButtons}>
            <NavLink className={styles.textList} to="/siniestros">
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
