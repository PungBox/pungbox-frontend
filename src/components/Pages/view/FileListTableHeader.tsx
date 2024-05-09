import React, { JSX, MouseEventHandler } from 'react';
import { fileListConfig as config, HeaderConfig } from '../../../utils/config';

interface FileListTableHeaderProps {
  sortingHandler: MouseEventHandler<HTMLElement>;
  sortingCriteria: string;
  isSortingAscending: boolean;
}

function getButtonInnerElement(sortableColumn: HeaderConfig, sortingCriteria: string, isSortingAscending: boolean) {
  let innerElement = <></>;
  if (sortableColumn.name === sortingCriteria) {
    innerElement = isSortingAscending ? (
      <span className="material-symbols-outlined">arrow_drop_up</span>
    ) : (
      <span className="material-symbols-outlined">arrow_drop_down</span>
    );
  }
  return innerElement;
}

function getSorters(sortingCriteria: string, isSortingAscending: boolean) {
  const sorters: { [key: string]: JSX.Element } = {};
  config.headers
    .filter((column) => {
      return column.sortable;
    })
    .forEach((sortableColumn) => {
      sorters[sortableColumn.name] = (
        <button>{getButtonInnerElement(sortableColumn, sortingCriteria, isSortingAscending)}</button>
      );
    });
  return sorters;
}

export const FileListTableHeader = ({
  sortingHandler,
  sortingCriteria,
  isSortingAscending,
}: FileListTableHeaderProps) => {
  const sorters = getSorters(sortingCriteria, isSortingAscending);

  return (
    <tr>
      {config.headers.map((column) => {
        const sorter = column.sortable ? sorters[column.name] : '';
        return (
          <th key={column.name} onClick={sortingHandler} style={{ userSelect: 'none' }}>
            <span className={column.name}>{column.displayName}</span>
            {sorters[column.name]}
          </th>
        );
      })}
    </tr>
  );
};
