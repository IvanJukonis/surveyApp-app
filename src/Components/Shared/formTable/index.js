import ButtonForm from '../ButtonForm';
import styles from './table.module.css';
import { useState } from 'react';
import { ModalConfirm, ModalSuccess, ToastError } from '../index';
import { useDispatch } from 'react-redux';

const FormTable = ({
  columnTitleArray,
  data,
  handleClick,
  deleteButton,
  columns,
  valueField,
  classes,
  type,
  userCondition,
  deleted
}) => {
  const fieldValue = valueField;
  const [toastError, setToastErroOpen] = useState(false);
  const [successModal, setModalSuccess] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [filterValue, setFilterValue] = useState('');
  const [idDelete, setIdDelete] = useState('');

  const dispatch = useDispatch();

  const onConfirmOpen = (id) => {
    if (deleteButton != undefined) {
      setModalConfirm(true);
      setIdDelete(id);
    }
  };

  const onConfirm = () => {
    if (userCondition == undefined || userCondition == true) {
      dispatch(deleteButton(idDelete));
      setModalSuccess(true);
    } else {
      setToastErroOpen(true);
    }
  };

  const ifObject = (item) => {
    if (item) {
      if (item.activity) {
        const findActivity = classes.find((act) => act._id === item._id);
        return findActivity?.activity && `${findActivity.activity?.name} - ${findActivity?.hour}`;
      }
      if (typeof item === 'object') {
        return <span>{item[fieldValue?.objectValue]}</span>;
      }
    }
  };

  const ifArray = (item) => {
    if (item) {
      if (Array.isArray(item)) {
        return item?.map((content, contentIndex) => (
          <span key={contentIndex}>
            {content[fieldValue?.arrayFirstValue]} {content[fieldValue?.arraySecondValue]}
          </span>
        ));
      }
    }
  };

  const ifNotArrayNotObject = (item, itemContent) => {
    if (typeof item[itemContent] !== 'object' && !Array.isArray(item[itemContent])) {
      if (itemContent === 'firstName') {
        return (
          <span>
            {item?.firstName} {item?.lastName}
          </span>
        );
      } else {
        return item[itemContent];
      }
    }
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const ifNotExist = (item) => {
    if (item?.length === 0) {
      return <span>This element Was Deleted. Edit to add</span>;
    }
  };

  const checkState = (index, property) => {
    console.log(data[index][property]);
    if (data[index][property]) {
      console.log('emtrooooo');
      if (data.find((singleData) => singleData[property] === true)) {
        return true;
      }
    }
    return false;
  };

  const checkStatePrioridad = (index) => checkState(index, 'prioridad');
  const checkStateVisibilidad = (index) => checkState(index, 'visibilidad');
  const checkStateInforme = (index) => checkState(index, 'informe');
  const checkStateRespuesta = (index) => checkState(index, 'respuesta');
  const checkStateComprobado = (index) => checkState(index, 'comprobado');
  const checkStateInspeccion = (index) => checkState(index, 'inspeccion');
  const checkStateSustraida = (index) => checkState(index, 'sustraida');
  const checkStatePresencia = (index) => checkState(index, 'presencia');
  const checkStateRuedaEntrevista = (index) => checkState(index, 'ruedaEntrevista');
  const checkStateRuedaInspeccion = (index) => checkState(index, 'ruedaInspeccion');
  const checkStateAtendido = (index) => checkState(index, 'atendido');
  const checkStateActivo = (index) => checkState(index, 'activo');

  return (
    <section className={type ? `${styles.containerForm}` : `${styles.container}`}>
      <div className={styles.filterContainer}>
        <label className={styles.filterText}>Buscador</label>
        <input
          type="text"
          className={styles.filter}
          placeholder=""
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      {data?.length === 0 ? (
        <div className={styles.noneTrainer}>
          <h3>The list is empty</h3>
        </div>
      ) : (
        <table className={type ? `${styles.tableForm}` : `${styles.table}`}>
          <thead>
            <tr className={styles.tableContent}>
              {columnTitleArray.map((column, index) => (
                <th key={index}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const rowClass = index % 2 === 0 ? styles.rowBackground1 : styles.rowBackground2;

              return (
                <tr
                  onClick={() => {
                    handleClick(index);
                  }}
                  className={rowClass}
                  key={index}
                >
                  {columns.map((column, columnIndex) => (
                    <td key={columnIndex}>
                      {column.startsWith('prioridad') ? (
                        <input
                          className={styles.checkboxInput}
                          type="checkbox"
                          readOnly
                          checked={checkStatePrioridad(index)}
                        />
                      ) : column.startsWith('fecha') || column.startsWith('hora') ? (
                        formatDate(row[column])
                      ) : column.startsWith('visibilidad') ? (
                        <input
                          className={styles.checkboxInput}
                          type="checkbox"
                          readOnly
                          checked={checkStateVisibilidad(index)}
                        />
                      ) : column.startsWith('comprobado') ? (
                        <input
                          className={styles.checkboxInputComprobado}
                          type="checkbox"
                          readOnly
                          checked={checkStateComprobado(index)}
                        />
                      ) : column.startsWith('informe') ? (
                        <input
                          className={styles.checkboxInput}
                          type="checkbox"
                          readOnly
                          checked={checkStateInforme(index)}
                        />
                      ) : column.startsWith('respuesta') ? (
                        <input
                          className={styles.checkboxInput}
                          type="checkbox"
                          readOnly
                          checked={checkStateRespuesta(index)}
                        />
                      ) : column.startsWith('inspeccion') ? (
                        <input
                          className={styles.checkboxInputInspeccion}
                          type="checkbox"
                          readOnly
                          checked={checkStateInspeccion(index)}
                        />
                      ) : column.startsWith('sustraida') ? (
                        <input
                          className={styles.checkboxInputSustraida}
                          type="checkbox"
                          readOnly
                          checked={checkStateSustraida(index)}
                        />
                      ) : column.startsWith('ruedaEntrevista') ? (
                        <input
                          className={styles.checkboxInputSustraida}
                          type="checkbox"
                          readOnly
                          checked={checkStateRuedaEntrevista(index)}
                        />
                      ) : column.startsWith('ruedaInspeccion') ? (
                        <input
                          className={styles.checkboxInputSustraida}
                          type="checkbox"
                          readOnly
                          checked={checkStateRuedaInspeccion(index)}
                        />
                      ) : column.startsWith('presencia') ? (
                        <input
                          className={styles.checkboxInputPresencia}
                          type="checkbox"
                          readOnly
                          checked={checkStatePresencia(index)}
                        />
                      ) : column.startsWith('activo') ? (
                        <input
                          className={styles.checkboxInputActivo}
                          type="checkbox"
                          readOnly
                          checked={checkStateActivo(index)}
                        />
                      ) : column.startsWith('atendido') ? (
                        <input
                          className={styles.checkboxInputAtendido}
                          type="checkbox"
                          readOnly
                          checked={checkStateAtendido(index)}
                        />
                      ) : (
                        <>
                          {ifArray(row[column])}
                          {ifObject(row[column])}
                          {ifNotArrayNotObject(row, column)}
                          {ifNotExist(row[column])}
                        </>
                      )}
                    </td>
                  ))}
                  {deleted == undefined && (
                    <td>
                      <ButtonForm
                        nameImg="trash-delete.svg"
                        onAction={() => onConfirmOpen(row._id)}
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {modalConfirm && (
        <ModalConfirm
          onConfirm={() => onConfirm()}
          message="¿Está seguro que desea eliminar el elemento?"
          method="Eliminar"
          setModalConfirmOpen={setModalConfirm}
        />
      )}
      {successModal && (
        <ModalSuccess
          setModalSuccessOpen={setModalSuccess}
          message="El elemento ha sido eliminado correctamente."
        />
      )}
      {toastError && (
        <ToastError
          setToastErroOpen={setToastErroOpen}
          message={'No posee permiso sobre la novedad seleccionada.'}
        />
      )}
    </section>
  );
};

export default FormTable;
