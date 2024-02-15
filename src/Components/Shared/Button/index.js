import React from 'react';
import styles from './button.module.css';

function Button({ clickAction, text, disabled = false, submition }) {
  return (
    <div className={styles.btnContainer}>
      <button
        type={text.toLowerCase() === 'reiniciar' || submition == true ? 'button' : 'submit'}
        className={text.toLowerCase() === 'cancelar' ? styles.btnCancel : styles.btnAccept}
        onClick={clickAction}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
