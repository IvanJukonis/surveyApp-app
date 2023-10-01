import styles from './header.module.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function Header() {
  return (
    <header>
      <nav className={styles.navbar}>
        <ul className={styles.rutes}>
          <li className={styles.homeButtons}>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li className={styles.homeButtons}>
            <NavLink to="/Vehicles">Vehicles</NavLink>
          </li>
          <li className={styles.homeButtons}>
            <NavLink to="/OcurrenceLocation">Ocurrence Location</NavLink>
          </li>
          <li className={styles.homeButtons}>
            <NavLink to="/Involved">Involved</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
