import React from 'react';
import styles from './option-multiple-input.module.css';

const SelectMultipleInput = ({
  data,
  dataLabel,
  name,
  register,
  error,
  disabled,
  onAction,
  testId
}) => {
  const ifFirstName = (item) => {
    if (item.nombre && item.apellido) {
      return `${item.nombre} ${item.apellido} (${item.email})`;
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

  return (
    <div className={styles.containerInput} data-testid={testId}>
      <label
        htmlFor="selectInput"
        className={error ? `${styles.nameLabel} ${styles.labelError}` : styles.nameLabel}
      ></label>
      <select
        onClick={onAction}
        multiple
        className={error ? `${styles.errorInput} ${styles.optionInput}` : styles.optionInput}
        name={name}
        {...register(name, { required: { value: true, message: 'This field is required' } })}
        disabled={disabled}
      >
        {data.map((item, index) => {
          return (
            <option key={index} value={item._id ? item._id : item}>
              {ifFirstName(item)}
              {ifObject(item)}
            </option>
          );
        })}
      </select>
      {error ? (
        <div className={styles.errorContainer}>
          <div className={styles.errorLogo}>!</div>
          <p className={styles.error}>{error}</p>
        </div>
      ) : (
        <p className={styles.spaceErrorMsg}></p>
      )}
    </div>
  );
};

export default SelectMultipleInput;
