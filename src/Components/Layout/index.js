import React from 'react';
import styles from './layout.module.css';
import Footer from '../Footer/index';
import Navbar from '../Navbar/Navbar';

function Layout(props) {
  return (
    <div className={styles.container}>
      <header className={styles.headerContainer}>
        <Navbar routes={props.routes} />
      </header>
      <div className={styles.switchContainer}>{props.children}</div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
