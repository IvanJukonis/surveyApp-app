import styles from './header.module.css';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function Header() {
  return (
    <header>
      <div className={styles.header}>
        <div className={styles.homeButtons}>
          <NavLink className={styles.textList} to="/home">
            Home
          </NavLink>
        </div>
        <div className={styles.homeButtons}>
          <NavLink className={styles.textList} to="/Vehiculo">
            Vehicles
          </NavLink>
        </div>
        <div className={styles.homeButtons}>
          <NavLink className={styles.textList} to="/Lugardeocurrencia">
            Ocurrence Location
          </NavLink>
        </div>
        <div className={styles.homeButtons}>
          <NavLink className={styles.textList} to="/Involucrados">
            Involved
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
