import React from 'react';
import styles from './modalSuccess.module.css';

const ModalInfo = ({ setModalInfo, redirect }) => {
  const handleClose = () => {
    setModalInfo(false);
  };

  return (
    <div className={styles.modalAlert}>
      <div className={styles.modalStyles}>
        <img
          className={styles.close_icon}
          onClick={handleClose}
          src={`${process.env.PUBLIC_URL}/assets/images/Delete.svg`}
          alt="cancel icon"
        />
        <div className={styles.text_cont}>
          <h3 className={styles.titleModal}>Evaluación de Siniestro</h3>
          <p className={styles.textModal}>
            A continuación, se proporciona una guía para llevar a cabo la evaluación asociada al
            siniestro. Es esencial tener en cuenta que los valores evaluados determinan las
            capacidades de respuesta de los dispositivos de protección, lo que implica una
            responsabilidad significativa y de gran importancia.
          </p>
          <h4 className={styles.titleModalSub}>Correcciones</h4>
          <p className={styles.textModal}>
            Determina la cantidad de correcciones que se le solicitaron al relevador luego de la
            finalizacion del siniestro (No incluye correcciones de gramatica o emprolijamiento del
            informe). Nulo (0), Bajo (1 a 3), Moderado (3 a 6), Alto (6 a 10), Muy Alto (10 en
            adelante).
          </p>
          <h4 className={styles.titleModalSub}>Desarrollo</h4>
          <p className={styles.textModal}>
            Este aspecto determina la eficacia resolutiva del relevador. En esta evaluación, se
            analizarán diversas capacidades, tales como la velocidad de resolución, la adherencia a
            las instrucciones y la gestión global del incidente. El valor asignado será subjetivo,
            donde (Muy Alto) indicará una resolución sobresaliente del incidente, mientras que
            (Nulo) reflejará una administración deficiente del siniestro.
          </p>
          <h4 className={styles.titleModalSub}>Gramática y Prolijidad</h4>
          <p className={styles.textModal}>
            Esta categoría mide la cantidad de correcciones necesarias para abordar errores de
            gramática o prolijidad en la presentación del informe solicitado al relevador después de
            la conclusión del siniestro. Los niveles de corrección se clasifican en: Nulo (0), Bajo
            (1 a 3), Moderado (3 a 6), Alto (6 a 10), y Muy Alto (10 en adelante).
          </p>
          <h4 className={styles.titleModalSub}>Demoras</h4>
          <p className={styles.textModal}>
            Evalúa la presencia de retrasos en el cumplimiento de las fechas establecidas para la
            gestión del siniestro, y determina la claridad en la comunicación de dichos retrasos
            para evitar posibles sanciones.
          </p>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.btnAccept}
            onClick={() => {
              if (!redirect) {
                handleClose();
              } else {
                handleClose();
              }
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalInfo;
