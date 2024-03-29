import Layout from 'Components/Layout';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import SignForm from '../Components/Auth/SignUp';
import LoginForm from 'Components/Auth/Login';
import RecoverPassword from 'Components/Auth/RecoverPassword';
import Home from 'Components/Home';
import { useEffect, useState } from 'react';

const routes = [
  {
    name: 'Home',
    path: '/auth/home',
    icon: 'newhome.svg'
  },
  {
    name: 'Login',
    path: '/auth/login',
    icon: 'login.svg'
  },
  {
    name: 'Sign Up',
    path: '/auth/sign-up',
    icon: 'signup.svg'
  }
];

const AuthRoute = () => {
  const [roleRoutes, setRoleRoutes] = useState(null);
  const role = sessionStorage.getItem('role');
  useEffect(() => {
    if (role) {
      switch (role) {
        case 'ADMINISTRATIVO': {
          setRoleRoutes([
            {
              name: 'Siniestros',
              path: '/controlador/siniestros',
              icon: 'calendar.svg'
            }
          ]);
          break;
        }
        case 'MEMBER': {
          setRoleRoutes([
            {
              name: 'Classes',
              path: '/member/classes',
              icon: 'calendar.svg'
            },
            {
              name: 'Activities',
              path: '/member/activities',
              icon: 'activities.svg'
            },
            {
              name: 'Profile',
              path: '/member/profile',
              icon: 'profile.svg'
            }
          ]);
          break;
        }
        case 'CONTROLADOR': {
          setRoleRoutes([
            {
              name: 'Siniestros',
              path: '/controlador/siniestros',
              icon: 'calendar.svg'
            }
          ]);
          break;
        }
        case 'RELEVADOR': {
          setRoleRoutes([
            {
              name: 'Siniestros',
              path: '/relevador/siniestros',
              icon: 'calendar.svg'
            }
          ]);
          break;
        }
        case 'SUPER_ADMIN': {
          setRoleRoutes([
            {
              name: 'Admin',
              path: '/superadmin/admin',
              icon: 'member.svg'
            },
            {
              name: 'Controlador',
              path: '/superadmin/controlador',
              icon: 'member.svg'
            },
            {
              name: 'Administrativo',
              path: '/superadmin/administrativo',
              icon: 'member.svg'
            },
            {
              name: 'Relevador',
              path: '/superadmin/relevador',
              icon: 'member.svg'
            }
          ]);
          break;
        }
        default:
          break;
      }
    } else {
      setRoleRoutes(null);
    }
  }, [role]);

  const { url } = useRouteMatch();
  return (
    <Layout routes={roleRoutes === null ? routes : roleRoutes}>
      <Switch>
        <Route exact path={`${url}/home`} component={Home} />
        <Route exact path={`${url}/login`} component={LoginForm} />
        <Route exact path={`${url}/sign-up`} component={SignForm} />
        <Route exact path={`${url}/recover-password`} component={RecoverPassword} />
        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoute;
