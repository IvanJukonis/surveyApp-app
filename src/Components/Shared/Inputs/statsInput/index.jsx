import React from 'react';
import styles from './normal-input.module.css';

const InputsStats = ({ type, isDisabled, nameInput, nameTitle, data }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.inputData}>
        <label className={styles.inputLabel}>{nameTitle}</label>
        <input
          className={styles.inputStats}
          type={type}
          disabled={isDisabled}
          name={nameInput}
          value={data}
          readOnly
        />
      </div>
    </div>
  );
};

export default InputsStats;
