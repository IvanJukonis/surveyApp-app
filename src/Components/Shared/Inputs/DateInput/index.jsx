import React from 'react';
import styles from './date-input.module.css';

const DateInput = ({ register, error, type, isDisabled, nameInput, nameTitle, styleDate }) => {
  const className = () => {
    let classes = styles.normalInput;
    if (error) {
      classes += ` ${styles.errorInput}`;
    }
    if (styleDate == 'red') {
      classes += ` ${styles.normalInputRed}`;
    }
    if (styleDate == 'yellow') {
      classes += ` ${styles.normalInputYellow}`;
    }
    if (styleDate == 'green') {
      classes += ` ${styles.normalInputGreen}`;
    }
    return classes;
  };
  const labelClassName = () => {
    let labelClasses = styles.dateLabel;

    if (styleDate == 'red') {
      labelClasses += ` ${styles.dateLabelRed}`;
    }
    if (styleDate == 'yellow') {
      labelClasses += ` ${styles.dateLabelYellow}`;
    }
    if (styleDate == 'green') {
      labelClasses += ` ${styles.dateLabelGreen}`;
    }
    return labelClasses;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputData}>
        <input
          {...register(nameInput, { required: { value: true, message: 'This field is required' } })}
          className={className()}
          type={type}
          disabled={isDisabled}
          name={nameInput}
        />
        <label className={labelClassName()}>{nameTitle}</label>
      </div>
      {error ? <p className={styles.error}>{error}</p> : <p className={styles.spaceErrorMsg}></p>}
    </div>
  );
};

export default DateInput;
