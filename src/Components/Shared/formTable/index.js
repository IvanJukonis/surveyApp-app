import ButtonForm from '../ButtonForm';
import styles from './table.module.css';
import { useState, useEffect } from 'react';
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
  const [filtered, setFiltered] = useState(data);
  const [idDelete, setIdDelete] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / 6);

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
    if (data[index][property]) {
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

  useEffect(() => {
    setFiltered(data);
    if (filtered.length === 0) {
      setFiltered(data);
    }
  }, [data]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={currentPage === i ? styles.activePage : styles.eachNumber}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

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
      {filtered?.length === 0 ? (
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
            {filtered
              .filter((row) =>
                columns.some((column) =>
                  String(row[column]).toLowerCase().includes(filterValue.toLowerCase())
                )
              )
              .map((row, index) => {
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
              })
              .slice((currentPage - 1) * 6, currentPage * 6)}
          </tbody>
        </table>
      )}
      <div className={styles.containerPaginate}>
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.buttonPaginate}
        >{`←`}</button>
        {renderPageNumbers()}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.buttonPaginate}
        >{`→`}</button>
      </div>
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
