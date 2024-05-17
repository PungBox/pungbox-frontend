import React from 'react';
import { fileListConfig as config } from '../../../../utils/config';
import { FileListTableHeaderProps, getSorters } from '../util/fileListTableHeader';


export const FileListTableHeader = (
  {
    handleSorting,
    sortingCriteria,
    isSortingAscending,
  }: FileListTableHeaderProps,
) => {
  const sorters = getSorters(sortingCriteria, isSortingAscending);
  
  return (
    <tr>
      {config.headers.map((column) => {
        return (
          <th key={column.name} onClick={handleSorting} style={{ userSelect: 'none' }}>
            <span className={column.name}>{column.displayName}</span>
            {sorters[column.name]}
          </th>
        );
      })}
    </tr>
  );
};
