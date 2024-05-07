import React, { JSX, MouseEventHandler } from 'react';
import { fileListConfig as config, HeaderConfig } from '../../../utils/config';

interface FileListTableHeaderProps {
  sortingHandler: MouseEventHandler<HTMLButtonElement>;
}

function getButtonInnerElement(sortableColumn: HeaderConfig) {
  let innerElement = <></>;
  if (sortableColumn.name === config.defaultSortingCriteria) {
    innerElement = sortableColumn.ascending ? (
      <span className="material-symbols-outlined">arrow_drop_up</span>
    ) : (
      <span className="material-symbols-outlined">arrow_drop_down</span>
    );
  }
  return innerElement;
}

function getSorters(sortingHandler: MouseEventHandler<HTMLButtonElement>) {
  const sorters: { [key: string]: JSX.Element } = {};
  config.headers
    .filter((column) => {
      return column.sortable;
    })
    .forEach((sortableColumn) => {
      sorters[sortableColumn.name] = <button onClick={sortingHandler}>{getButtonInnerElement(sortableColumn)}</button>;
    });
  return sorters;
}

export const FileListTableHeader = ({ sortingHandler }: FileListTableHeaderProps) => {
  const sorters = getSorters(sortingHandler);

  return (
    <tr>
      {config.headers.map((column) => {
        const sorter = column.sortable ? sorters[column.name] : '';
        return (
          <th key={column.name}>
            {column.displayName}
            {sorters[column.name]}
          </th>
        );
      })}
    </tr>
  );
};
