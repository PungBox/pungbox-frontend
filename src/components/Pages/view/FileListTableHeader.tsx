import React, { JSX } from 'react';
import { fileListConfig as config } from '../../../utils/config';

interface FileListTableHeaderProps {
  sortingHandler: Function;
}

function getSorters() {
  const sorters: { [key: string]: JSX.Element } = {};
  config.headers
    .filter((column) => {
      return column.sortable;
    })
    .forEach((sortableColumn) => {
      let sorter;
      if (sortableColumn.name === config.defaultSortingCriteria) {
        sorter = sortableColumn.ascending ? (
          <button>
            <span className="material-symbols-outlined">arrow_drop_up</span>
          </button>
        ) : (
          <button>
            <span className="material-symbols-outlined">arrow_drop_down</span>
          </button>
        );
      } else {
        sorter = <button></button>;
      }
      sorters[sortableColumn.name] = sorter;
    });
  return sorters;
}

export const FileListTableHeader = ({ sortingHandler }: FileListTableHeaderProps) => {
  const sorters = getSorters();

  return (
    <tr>
      {config.headers.map((column) => {
        const sorter = column.sortable ? sorters[column.name] : '';
        return (
          <th key={column.name}>
            {column.displayName}
            {sorter}
          </th>
        );
      })}
    </tr>
  );
};
