import styles from './table.module.css';
import { useState, useEffect } from 'react';

const TableList = ({ columnTitleArray, data, handleClick, columns, valueField, classes, type }) => {
  const fieldValue = valueField;
  const [filterValue, setFilterValue] = useState('');
  const [filtered, setFiltered] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filtered.length / 6);

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

  const checkStatePrioridad = (index) => checkState(index, 'activo');

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
                        {column.startsWith('activo') ? (
                          <input
                            className={styles.checkboxInput}
                            type="checkbox"
                            readOnly
                            checked={checkStatePrioridad(index)}
                          />
                        ) : column.startsWith('fecha') || column.startsWith('hora') ? (
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
    </section>
  );
};

export default TableList;
