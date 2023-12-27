import React from 'react';
import styles from './textarea-input.module.css';

const TextArea = ({ register, error, type, isDisabled, nameInput, nameTitle, styleInput }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputData}>
        <label className={styles.inputLabel}>{nameTitle}</label>
        <textarea
          {...register(nameInput, { required: { value: true, message: 'This field is required' } })}
          className={error ? `${styles.errorInput} ${styles[styleInput]}` : `${styles[styleInput]}`}
          type={type}
          disabled={isDisabled}
          name={nameInput}
        />
        <div className={styles.underline}></div>
      </div>
      {error ? <p className={styles.error}>{error}</p> : <p className={styles.spaceErrorMsg}></p>}
    </div>
  );
};

export default TextArea;
