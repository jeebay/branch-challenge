import React from 'react';
import { srOnly, th } from './styles.module.css';

export const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th className={th}>
          <span className={srOnly}>Bulk select</span>
        </th>
        <th className={th}>Email</th>
        <th className={th}>Name</th>
        <th className={th}>Role</th>
      </tr>
    </thead>
  );
};
