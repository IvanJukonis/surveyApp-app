import React from 'react';
import styles from './addButton.module.css';

const AddButton = ({ entity, createMode }) => {
  return (
    <div className={styles.container_button}>
      <button className={styles.add_button} onClick={createMode}>
        crear {entity}
      </button>
    </div>
  );
};

export default AddButton;
