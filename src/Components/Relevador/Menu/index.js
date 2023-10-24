import { useEffect } from 'react';
import styles from './relevadorMenu.module.css';

function RelevadorMenu() {
  //const dispatch = useDispatch();
  // const involved = useSelector((state) => state.testBack.list);

  useEffect(() => {
    //getAllInvolved(dispatch);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.menuContainer}>
        <div className={styles.upperContainer}>
          <p className={styles.textContainer}>Canal de Avisos</p>
        </div>
        <div className={styles.lowerContainer}></div>
      </div>
      <div className={styles.menuContainer}>
        <div className={styles.upperContainer}>
          <div className={styles.upperLeftContainer}>
            <p className={styles.textContainer}>Siniestros Actuales</p>
          </div>
          <div className={styles.upperRightContainer}>
            <p className={styles.textContainer}>Estado de Siniestro</p>
          </div>
        </div>
        <div className={styles.lowerContainer}>
          <div className={styles.lowerLeftContainer}></div>
          <div className={styles.lowerRightContainer}></div>
        </div>
      </div>
      <div className={styles.menuContainer}>
        <div className={styles.upperContainer}>
          <p className={styles.textContainer}>Estadisticas de Perfil</p>
        </div>
        <div className={styles.lowerContainer}></div>
      </div>
    </div>
  );
}
export default RelevadorMenu;
