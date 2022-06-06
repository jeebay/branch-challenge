import React from 'react';
import { Button } from '../button';
import styles from './styles.module.css';

export const Nav = ({ title, buttonText, action, state }) => {
  return (
    <div className={styles.nav}>
      <h1 className={styles.h1}>{title}</h1>
      <Button variant={state} onClick={action} disabled={state === Nav.state.disabled}>
        {buttonText}
      </Button>
    </div>
  );
};

Nav.state = {
  danger: 'danger',
  disabled: 'disabled',
  primary: 'primary',
};
