import React from 'react';
import styles from './layout.module.css';
import Footer from '../Footer/index';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { getAdministrativo } from 'redux/administrativo/thunks';
import { getControlador } from 'redux/controlador/thunks';
import { getRelevador } from 'redux/relevador/thunks';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getFirebaseUidFromToken } from '../../Config/firebase-config';
import 'firebase/compat/auth';

function Layout(props) {
  const dispatch = useDispatch();
  const [userCurrent, setUserCurrent] = useState('');
  const [loggedUser, setLoggedUser] = useState(false);
  const administrativos = useSelector((state) => state.administrativo.list);
  const controladores = useSelector((state) => state.controlador.list);
  const relevadores = useSelector((state) => state.relevador.list);
  const administrativo = administrativos.find(
    (oneAdministrativo) => oneAdministrativo.email === userCurrent
  );
  const controlador = controladores.find((oneControlador) => oneControlador.email === userCurrent);
  const relevador = relevadores.find((oneRelevador) => oneRelevador.email === userCurrent);
  const role = sessionStorage.getItem('role');

  const currentUser = async () => {
    try {
      const emailCurrentUser = await getFirebaseUidFromToken();
      setUserCurrent(emailCurrentUser);
    } catch (error) {
      return error;
    }
  };

  const userData = () => {
    if (administrativo) {
      return {
        nombre: administrativo?.nombre,
        apellido: administrativo?.apellido,
        email: administrativo?.email,
        link: '/administrativo/perfil'
      };
    }
    if (controlador) {
      return {
        nombre: controlador?.nombre,
        apellido: controlador?.apellido,
        email: controlador?.email,
        link: '/controlador/perfil'
      };
    }
    if (relevador) {
      return {
        nombre: relevador?.nombre,
        apellido: relevador?.apellido,
        email: relevador?.email,
        link: '/relevador/perfil'
      };
    }
  };

  const checkUsers = () => {
    if (typeof relevador?.nombre === 'string' && relevador?.nombre.trim() !== '') {
      setLoggedUser(true);
      return;
    }
    if (typeof administrativo?.nombre === 'string' && administrativo?.nombre.trim() !== '') {
      setLoggedUser(true);
      return;
    }
    if (typeof controlador?.nombre === 'string' && controlador?.nombre.trim() !== '') {
      setLoggedUser(true);
      return;
    }
    setLoggedUser(false);
  };

  useEffect(() => {
    getRelevador(dispatch);
    getControlador(dispatch);
    getAdministrativo(dispatch);
  }, []);

  useEffect(() => {
    currentUser();
    checkUsers();
  }, [relevador || administrativo || controlador]);

  return (
    <div className={styles.container}>
      <div>
        <header className={styles.headerContainer}>
          <Navbar routes={props.routes} />
        </header>
        <div>
          {loggedUser && (
            <Link to={userData()?.link} className={styles.links}>
              <div className={styles.profileInfoContainer}>
                <p className={styles.userName}>
                  {userData()?.nombre} {userData()?.apellido}{' '}
                  <span className={styles.userRole}>({role})</span>
                </p>
                <p className={styles.userEmail}>{userData()?.email}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className={styles.switchContainer}>{props.children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
