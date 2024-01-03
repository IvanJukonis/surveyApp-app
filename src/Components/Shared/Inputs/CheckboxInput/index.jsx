import React from 'react';
import styles from './checkbox-input.module.css';

const Checkbox = ({ register, error, type, isDisabled, nameInput, nameTitle, wrapper }) => {
  return (
    <div className={wrapper ? styles.wrapperLeft : styles.wrapper}>
      <label>{nameTitle}</label>
      <input
        {...register(nameInput, { required: { value: true, message: 'This field is required' } })}
        className={error ? `${styles.errorInput} ${styles.normalInput}` : styles.normalInput}
        type={type}
        disabled={isDisabled}
        name={nameInput}
      />
      {error ? <p className={styles.error}>{error}</p> : <p className={styles.spaceErrorMsg}></p>}
    </div>
  );
};

export default Checkbox;
