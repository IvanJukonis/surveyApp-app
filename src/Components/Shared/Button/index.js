import React from 'react';
import styles from './button.module.css';

function Button({ clickAction, text, disabled = false }) {
  return (
    <div className={styles.btnContainer}>
      <button
        type={text.toLowerCase() === 'reiniciar' ? 'button' : 'submit'}
        className={text.toLowerCase() === 'cancel' ? styles.btnCancel : styles.btnAccept}
        onClick={clickAction}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
