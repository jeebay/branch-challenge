import React from 'react';
import { main } from './styles.module.css';

export const AppContainer = ({ children }) => {
  return <main className={main}>{children}</main>;
};
