import React from 'react';
import styles from './styles.module.css';

export const Radio = ({ checked, id, label, name, onChange, value }) => {
  return (
    <div className={styles.radioItem}>
      <input
        className={styles.input}
        id={id}
        type="radio"
        value={value}
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
