import ButtonForm from '../ButtonForm';
import styles from './table.module.css';
import { useState } from 'react';
import { ModalConfirm, ModalSuccess } from '../index';
import { useDispatch } from 'react-redux';

const FormTable = ({
  columnTitleArray,
  data,
  handleClick,
  deleteButton,
  columns,
  valueField,
  classes
}) => {
  const fieldValue = valueField;
  const [successModal, setModalSuccess] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [idDelete, setIdDelete] = useState('');

  const dispatch = useDispatch();

  const onConfirmOpen = (id) => {
    if (deleteButton != undefined) {
      setModalConfirm(true);
      setIdDelete(id);
    }
  };

  const onConfirm = () => {
    dispatch(deleteButton(idDelete));
    setModalSuccess(true);
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

  const checkState = (index) => {
    if (data[index].prioridad) {
      if (data.find((singleData) => singleData.prioridad === true)) {
        return true;
      }
    }
    return false;
  };

  return (
    <section className={styles.container}>
      {data?.length === 0 ? (
        <div className={styles.noneTrainer}>
          <h3>The list is empty</h3>
        </div>
      ) : (
        <table className={styles.table}>
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
                          checked={checkState(index)}
                        />
                      ) : column.startsWith('fecha') ? (
                        formatDate(row[column])
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
                  <td>
                    <ButtonForm
                      nameImg="trash-delete.svg"
                      onAction={() => onConfirmOpen(row._id)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      {modalConfirm && (
        <ModalConfirm
          onConfirm={() => onConfirm()}
          message="Are you sure to delete this?"
          method="Delete"
          setModalConfirmOpen={setModalConfirm}
        />
      )}
      {successModal && (
        <ModalSuccess setModalSuccessOpen={setModalSuccess} message="Delete Successfully" />
      )}
    </section>
  );
};

export default FormTable;
