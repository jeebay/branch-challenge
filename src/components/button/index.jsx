import React from 'react';
import styles from './styles.module.css';

export const Button = ({ children, variant, ...rest }) => {
  return (
    <button
      className={styles[variant ?? Button.VARIANTS.primary]}
      disabled={variant === Button.VARIANTS.disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.VARIANTS = {
  danger: 'danger',
  disabled: 'disabled',
  primary: 'primary',
};
