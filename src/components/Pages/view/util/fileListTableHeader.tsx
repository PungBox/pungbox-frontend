import { fileListConfig as config, HeaderConfig } from '../../../../utils/config';
import React, { JSX, MouseEventHandler } from 'react';
import { FileDescription } from '../../../../utils/interface';

const headerNames = config.headers.map((header: HeaderConfig): string => {
  return header.name;
});
type headerNames = (typeof headerNames)[number];

interface FileListTableHeaderProps {
  handleSorting: MouseEventHandler<HTMLElement>;
  sortingCriteria: headerNames;
  isSortingAscending: boolean;
  fileDescriptions: FileDescription[];
  selected: { [key: number]: boolean };
  deleteFile: (fileId: number) => void;
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

function downloadFile(url: string): void {
  window.location.href = url;
}

export type { FileListTableHeaderProps };
export { getSorters, downloadFile };