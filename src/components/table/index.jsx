import React from 'react';
import { table } from './styles.module.css';

export const Table = ({ children }) => {
  return <table className={table}>{children}</table>;
};
