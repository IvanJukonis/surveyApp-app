const {
  loginPending,
  loginSuccess,
  loginError,
  logOutError,
  logOutSuccess,
  logOutPending,
  getAuthenticationPending,
  getAuthenticationSuccess,
  getAuthenticationError,
  signUpPending,
  signUpError,
  signUpSuccess,
  recoverPasswordPending,
  recoverPasswordError
} = require('./actions');

import { firebaseApp } from 'Config/firebase-config';

export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginPending());
    try {
      const firebaseResponse = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      const token = await firebaseResponse.user.getIdToken();
      const {
        claims: { role }
      } = await firebaseResponse.user.getIdTokenResult();
      return dispatch(loginSuccess({ role, token }));
    } catch (error) {
      return dispatch(loginError(error.toString()));
    }
  };
};

export const signUpControlador = (data) => {
  return async (dispatch) => {
    dispatch(signUpPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/controlador/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const newData = await response.json();
      if (response.ok) {
        dispatch(signUpError({ error: false, message: 'No error' }));
        return dispatch(signUpSuccess(newData));
      }
      const errorMessage = newData.message.code || newData.message;
      return dispatch(signUpError({ error: true, message: errorMessage }));
    } catch (err) {
      return dispatch(signUpError({ error: true, message: err }));
    }
  };
};

export const signUpConsultor = (data) => {
  return async (dispatch) => {
    dispatch(signUpPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/consultor/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const newData = await response.json();
      if (response.ok) {
        dispatch(signUpError({ error: false, message: 'No error' }));
        return dispatch(signUpSuccess(newData));
      }
      const errorMessage = newData.message.code || newData.message;
      return dispatch(signUpError({ error: true, message: errorMessage }));
    } catch (err) {
      return dispatch(signUpError({ error: true, message: err }));
    }
  };
};

export const signUpAdministrativo = (data) => {
  return async (dispatch) => {
    dispatch(signUpPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/administrativo/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const newData = await response.json();
      if (response.ok) {
        dispatch(signUpError({ error: false, message: 'No error' }));
        return dispatch(signUpSuccess(newData));
      }
      const errorMessage = newData.message.code || newData.message;
      return dispatch(signUpError({ error: true, message: errorMessage }));
    } catch (err) {
      return dispatch(signUpError({ error: true, message: err }));
    }
  };
};

export const signUpRelevador = (data) => {
  return async (dispatch) => {
    dispatch(signUpPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/relevador/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const newData = await response.json();
      if (response.ok) {
        dispatch(signUpError({ error: false, message: 'No error' }));
        return dispatch(signUpSuccess(newData));
      }
      const errorMessage = newData.message.code || newData.message;
      return dispatch(signUpError({ error: true, message: errorMessage }));
    } catch (err) {
      return dispatch(signUpError({ error: true, message: err }));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(logOutPending());
    try {
      await firebaseApp.auth().signOut();
      dispatch(logOutSuccess());
      sessionStorage.removeItem('token', '');
      sessionStorage.removeItem('role', '');
      sessionStorage.removeItem('img', '');
      return { error: false, message: 'Logout successfully' };
    } catch (error) {
      dispatch(logOutError(error));
      return { error: true, message: 'Error' };
    }
  };
};

export const getAuth = (token) => {
  return async (dispatch) => {
    dispatch(getAuthenticationPending());
    try {
      const response = fetch(`${process.env.REACT_APP_API_URL}/api/auth/`, { headers: { token } });
      const res = (await response).json();
      dispatch(getAuthenticationSuccess(res.data));
      return res.data;
    } catch (error) {
      return dispatch(getAuthenticationError(error.toString()));
    }
  };
};

export const recoverPassword = (data) => {
  return async (dispatch) => {
    dispatch(recoverPasswordPending());
    try {
      await firebaseApp.auth().sendPasswordResetEmail(data.email);
    } catch (error) {
      return dispatch(recoverPasswordError(error.toString()));
    }
  };
};
