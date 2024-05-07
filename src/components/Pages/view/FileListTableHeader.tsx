import React, { JSX } from 'react';
import { fileListConfig as config, HeaderConfig } from '../../../utils/config';

interface FileListTableHeaderProps {
  sortingHandler: Function;
}

const ascendingButton = (
  <button>
    <span className="material-symbols-outlined">arrow_drop_up</span>
  </button>
);
const descendingButton = (
  <button>
    <span className="material-symbols-outlined">arrow_drop_down</span>
  </button>
);

function appendSorter(sortableColumn: HeaderConfig, sorters: { [key: string]: React.JSX.Element }) {
  let sorter;
  if (sortableColumn.name === config.defaultSortingCriteria) {
    sorter = sortableColumn.ascending ? ascendingButton : descendingButton;
  } else {
    sorter = <button></button>;
  }
  sorters[sortableColumn.name] = sorter;
}

function getSorters() {
  const sorters: { [key: string]: JSX.Element } = {};
  config.headers
    .filter((column) => {
      return column.sortable;
    })
    .forEach((sortableColumns) => appendSorter(sortableColumns, sorters));
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
