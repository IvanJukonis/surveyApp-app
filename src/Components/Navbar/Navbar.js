import React, { useState } from 'react';
import styles from './navbar.module.css';
import { NavLink } from 'react-router-dom';
import LogOut from 'Components/Auth/LogOut';

const Navbar = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const token = sessionStorage.getItem('token');

  return (
    <nav
      className={styles.navbar}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ul className={styles.rutes}>
        {props.routes.map((route) => (
          <li key={route.name}>
            <NavLink
              to={route.path}
              className={styles.navbarLink}
              activeClassName={styles.active}
              data-testid="home-btn"
            >
              <span>{route.name}</span>
            </NavLink>
          </li>
        ))}
        <div className={styles.logoutButton}>{!!token && <LogOut isHovered={isHovered} />}</div>
      </ul>
    </nav>
  );
};

export default Navbar;
