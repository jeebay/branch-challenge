import React from 'react';
import { tableRow } from './styles.module.css';

export const TableRow = ({ children }) => {
  return <tr className={tableRow}>{children}</tr>;
};
