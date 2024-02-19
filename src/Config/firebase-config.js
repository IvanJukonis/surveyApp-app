import firebase from 'firebase/compat/app';
import { getAuth } from 'firebase/auth';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBgEZYWnyiX4ZH8Bg8iIFNF3cc-ubse6RM',
  authDomain: 'sapp-fa2ef.firebaseapp.com',
  projectId: 'sapp-fa2ef',
  storageBucket: 'sapp-fa2ef.appspot.com',
  messagingSenderId: '237228484024',
  appId: '1:237228484024:web:1515d0109ddae9ee721b4d'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const tokenListener = () => {
  firebase.auth().onIdTokenChanged(async (user) => {
    if (user) {
      const token = await user.getIdToken();
      const {
        claims: { role }
      } = await user.getIdTokenResult();
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('token', token);
    }
  });
};

export const getFirebaseUidFromToken = async () => {
  try {
    const auth = getAuth();
    const decodedToken = await auth.currentUser.getIdTokenResult();
    const idCurrentUser = decodedToken.claims.email;
    return idCurrentUser;
  } catch (error) {
    return error;
  }
};
