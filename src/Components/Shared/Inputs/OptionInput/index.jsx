import React from 'react';
import styles from './option-input.module.css';

const SelectInput = ({ data, dataLabel, name, isDisabled, register, error }) => {
  const ifFirstName = (item) => {
    if (item.nombre && item.apellido) {
      return `${item.nombre} ${item.apellido}`;
    }
  };

  const ifObject = (item) => {
    if (typeof item.activity === 'object') {
      return item.activity ? `${item.activity.name} -  ${item.hour}` : `incomplete ${dataLabel}`;
    }
    if (typeof item === 'object') {
      return item ? item.name : `incomplete ${dataLabel}`;
    }
    if (typeof item !== 'object') {
      return item;
    }
  };

  const handleSelectChange = () => {
    console.log('holi');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputData}>
        <select
          className={error ? `${styles.errorInput} ${styles.optionInput}` : styles.optionInput}
          name={name}
          disabled={isDisabled}
          onChange={handleSelectChange}
          {...register(name, { required: { value: true, message: 'This field is required' } })}
        >
          <option className={styles.optionText} value="">
            Seleccionar {dataLabel}
          </option>
          {data.map((item, index) => {
            return (
              <option key={index} value={item._id ? item._id : item}>
                {ifFirstName(item)}
                {ifObject(item)}
              </option>
            );
          })}
        </select>
        <label className={styles.inputLabel}>{dataLabel}</label>
      </div>
      {error ? <p className={styles.error}>{error}</p> : <p className={styles.spaceErrorMsg}></p>}
    </div>
  );
};

export default SelectInput;
