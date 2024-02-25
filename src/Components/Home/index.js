import { useEffect, useState } from 'react';
import styles from './home.module.css';
import LoadHome from 'Components/Shared/LoadHome';
import { Loader } from 'Components/Shared';
import homeImg1 from '../../public/homeImg1.jpg';
import homeImg3 from '../../public/homeImg3.jpg';
import funcionalidadImg1 from '../../public/icon-list.png';
function Home() {
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(false);
  };

  useEffect(() => {
    const handleReadyState = () => {
      if (document.readyState === 'complete') {
        load();
      }
    };

    if (document.readyState === 'complete') {
      load();
    } else {
      document.addEventListener('readystatechange', handleReadyState);
    }

    return () => {
      document.removeEventListener('readystatechange', handleReadyState);
    };
  }, []);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    if (firstLoading) {
      setTimeout(() => {
        setFirstLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <>
      {firstLoading ? (
        <Loader />
      ) : (
        <section className={styles.container}>
          <section className={styles.sectionHead}>
            {loading ? (
              <LoadHome />
            ) : (
              <div className={styles.containerSectionHead}>
                <div className={styles.content}>
                  <h1 className={styles.title}>Bienvenido a SurveyApp</h1>
                  <h2 className={styles.subTitle}>
                    Sistema Integral de Administracion de Siniestros
                  </h2>
                </div>
                <video className={styles.bannerVideo} autoPlay loop muted>
                  <source src="/assets/video/video2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </section>
          <section className={styles.sectionAbout}>
            <h2 className={styles.sectionTitleBlue}>Acerca de SurveyApp</h2>
            <div className={styles.subTitleContainer}>
              {' '}
              SURVEYAPP es una herramienta tecnológica especializada en la rápida y eficaz
              resolución de siniestros. Aprovechando las capacidades de nuestros sistemas, brindamos
              un servicio de gestión de siniestros incomparable.{' '}
            </div>
            <div className={styles.infoContainer}>
              <img className={styles.imgMenu} src={homeImg1} alt="Dos autos en colision" />
              <div className={styles.infoText}>
                <p>
                  Nos especializamos en la gestión integral de siniestros, brindando un servicio
                  dedicado a resolver eficazmente situaciones adversas y determinar las
                  responsabilidades correspondientes. Nuestra misión es proporcionar a nuestros
                  clientes la tranquilidad necesaria en momentos difíciles, cerrando cada incidente
                  de manera justa y satisfactoria para todos los afectados.
                </p>
              </div>
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.infoText}>
                <p>
                  Ofrecemos un servicio especializado en la detección de acciones fraudulentas, con
                  un enfoque particular en autorrobos de ruedas. Nuestro equipo cuenta con las
                  herramientas más avanzadas y eficientes para llevar a cabo un exhaustivo análisis
                  y determinar con precisión la autenticidad de cada incidente.
                </p>
              </div>
              <img className={styles.imgMenu} src={homeImg3} alt="Rueda" />
            </div>
          </section>
          <section className={styles.sectionFunciones}>
            <h2 className={styles.funcionesTitle}>Funcionalidades</h2>
            <div className={styles.sectionFuncionesContainer}>
              <div className={styles.sectionFuncionesInner}>
                <div className={styles.sectionFuncionesTop}>
                  <div>
                    <img className={styles.imgFuncionalidad} src={funcionalidadImg1} alt="Icono" />
                  </div>
                  <p className={styles.titleFuncionalidad}>Registro de Datos</p>
                </div>
                <div className={styles.sectionFuncionesBot}>
                  <p className={styles.textFuncionalidad}>
                    Disponemos de una amplia red de almacenes de datos diseñada para capturar y
                    procesar de manera eficiente toda la información relevante relacionada con los
                    eventos ocurridos, así como los vehículos e individuos involucrados. Esta
                    infraestructura robusta nos permite gestionar grandes cantidades de datos de
                    manera sistemática y precisa.
                  </p>
                </div>
              </div>
              <div className={styles.sectionFuncionesInner}>
                <div className={styles.sectionFuncionesTop}>
                  <div>
                    <img className={styles.imgFuncionalidad} src={funcionalidadImg1} alt="Icono" />
                  </div>
                  <p className={styles.titleFuncionalidad}>Control de Usuarios</p>
                </div>
                <div className={styles.sectionFuncionesBot}>
                  <p className={styles.textFuncionalidad}>
                    Disponemos de un sólido sistema de control de usuarios que actúa como un pilar
                    fundamental en nuestra estrategia para garantizar la seguridad de la información
                    y la asignación precisa de relevadores y controladores de siniestros. Este
                    sistema está diseñado con los más altos estándares de seguridad para
                    salvaguardar los datos críticos y asegurar que cada usuario tenga acceso
                    únicamente a la información pertinente a sus responsabilidades.
                  </p>
                </div>
              </div>
              <div className={styles.sectionFuncionesInner}>
                <div className={styles.sectionFuncionesTop}>
                  <div>
                    <img className={styles.imgFuncionalidad} src={funcionalidadImg1} alt="Icono" />
                  </div>
                  <p className={styles.titleFuncionalidad}>Exportación de Registros</p>
                </div>
                <div className={styles.sectionFuncionesBot}>
                  <p className={styles.textFuncionalidad}>
                    Facilitamos la eficiencia y la transparencia en nuestros procesos al ofrecer
                    exportación directa tanto de informes siniestrales como de entrevistas,
                    proporcionando todos los datos necesarios de manera accesible y oportuna.
                    Nuestro sistema está diseñado para brindar una experiencia sin inconvenientes,
                    permitiendo a nuestros clientes acceder y compartir fácilmente información
                    crucial.
                  </p>
                </div>
              </div>
              <div className={styles.sectionFuncionesInner}>
                <div className={styles.sectionFuncionesTop}>
                  <div>
                    <img className={styles.imgFuncionalidad} src={funcionalidadImg1} alt="Icono" />
                  </div>
                  <p className={styles.titleFuncionalidad}>Evaluaciones de Desempeño</p>
                </div>
                <div className={styles.sectionFuncionesBot}>
                  <p className={styles.textFuncionalidad}>
                    Realizamos evaluaciones continuas de la resolución de siniestros y del desempeño
                    en todas las actividades llevadas a cabo, con el objetivo de perfeccionar
                    constantemente nuestra atención. Estas evaluaciones son parte integral de
                    nuestro compromiso con la mejora continua y la excelencia en el servicio.
                  </p>
                </div>
              </div>
              <div className={styles.sectionFuncionesInner}>
                <div className={styles.sectionFuncionesTop}>
                  <div>
                    <img className={styles.imgFuncionalidad} src={funcionalidadImg1} alt="Icono" />
                  </div>
                  <p className={styles.titleFuncionalidad}>Fraudulencia</p>
                </div>
                <div className={styles.sectionFuncionesBot}>
                  <p className={styles.textFuncionalidad}>
                    Disponemos de herramientas especializadas que simplifican el análisis de
                    siniestros, permitiéndonos determinar de manera eficiente la autenticidad de
                    cada incidente y detectar posibles fraudes. Estas herramientas, respaldadas por
                    tecnología avanzada, nos proporcionan la capacidad de realizar evaluaciones
                    exhaustivas y precisas.
                  </p>
                </div>
              </div>
              <div className={styles.sectionFuncionesInner}>
                <div className={styles.sectionFuncionesTop}>
                  <div>
                    <img className={styles.imgFuncionalidad} src={funcionalidadImg1} alt="Icono" />
                  </div>
                  <p className={styles.titleFuncionalidad}>Novedades</p>
                </div>
                <div className={styles.sectionFuncionesBot}>
                  <p className={styles.textFuncionalidad}>
                    Implementamos un sistema de comunicación de novedades que asegura una
                    comunicación continua entre los diversos participantes en un siniestro, con el
                    objetivo de lograr una resolución rápida y eficaz. Este sistema, diseñado para
                    facilitar la colaboración y la coordinación, es una pieza fundamental en nuestro
                    compromiso con la eficiencia y la atención efectiva.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.sectionAbout}>
            <h2 className={styles.sectionTitleBlue}>Conoce nuestro impacto</h2>
            <iframe
              className={styles.youtubeVideo}
              width="560"
              height="315"
              src="https://www.youtube.com/embed/DHj9oyblaPw?si=e02w9qXkFJFSzmqz"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </section>
        </section>
      )}
    </>
  );
}

export default Home;
