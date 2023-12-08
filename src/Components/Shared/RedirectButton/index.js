import React from 'react';
import styles from './button.module.css';

function RedirectButton({ clickAction, text, disabled = false, data }) {
  return (
    <div className={styles.btnContainer}>
      <button
        type={text.toLowerCase() === 'reset' ? 'button' : 'submit'}
        className={text.toLowerCase() === 'cancel' ? styles.btnCancel : styles.btnAccept}
        onClick={() => clickAction(data)}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
}

export default RedirectButton;
