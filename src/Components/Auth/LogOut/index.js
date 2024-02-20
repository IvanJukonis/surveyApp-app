import React from 'react';
import { logout } from 'redux/auth/thunks';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './logout.module.css';

function LogOut({ isHovered }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutAction = async () => {
    await dispatch(logout());
    history.push('/auth/login');
  };

  return (
    <div className={styles.logButton} onClick={logoutAction} data-testId="log-out-btn">
      <p className={isHovered ? styles.logText : styles.logTextHidden}>Cerrar Sesión</p>
    </div>
  );
}

export default LogOut;
