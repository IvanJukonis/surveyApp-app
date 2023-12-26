import React from 'react';
import styles from './normal-input.module.css';

const Inputs = ({ register, error, type, isDisabled, nameInput, nameTitle, styleInput }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputData}>
        <input
          {...register(nameInput, {
            required: { value: true, message: 'This field is required' }
          })}
          className={error ? `${styles.errorInput} ${styles[styleInput]}` : `${styles[styleInput]}`}
          type={type}
          disabled={isDisabled}
          name={nameInput}
        />
        <label className={styles.inputLabel}>{nameTitle}</label>
        <div className={styles.underline}></div>
      </div>
      {error ? <p className={styles.error}>{error}</p> : <p className={styles.spaceErrorMsg}></p>}
    </div>
  );
};

export default Inputs;
