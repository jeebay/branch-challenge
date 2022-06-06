import React from 'react';
import { tableCell } from './styles.module.css';

export const TableCell = ({ children }) => {
  return <td className={tableCell}>{children}</td>;
};
