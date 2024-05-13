import React, { useCallback, useState } from 'react';
import { fileListConfig } from '../../../../../utils/config';
import { getNewlySortedFileDescriptions } from './fileDescription';
import { FileDescription } from '../../../../../utils/interface';

function getIsDefaultSortingOrderForTheColumnAscending(columnName: string): boolean {
  const column = fileListConfig.headers.filter((column) => {
    return column.name === columnName;
  })[0];
  return column.ascending as boolean;
}

const isDefaultSortingOrderAscending = getIsDefaultSortingOrderForTheColumnAscending(
  fileListConfig.defaultSortingCriteria,
);

function useSortingOrder() {
  const [sortingCriteria, setSortingCriteria] = useState(fileListConfig.defaultSortingCriteria);
  const [isSortingAscending, setIsSortingAscending] = useState(!isDefaultSortingOrderAscending);

  function resetToDefaultSortingOrder(columnName: string): void {
    const isDefaultSortingOrderAscending = getIsDefaultSortingOrderForTheColumnAscending(columnName);
    setIsSortingAscending(isDefaultSortingOrderAscending);
  }

  function toggleSortingOrder() {
    const newIsSortingAscending = !isSortingAscending;
    setIsSortingAscending(newIsSortingAscending);
  }

  function handleSorting(e: React.MouseEvent<HTMLElement>) {
    const newSortingCriteria = (e.target as HTMLElement).className;
    if (newSortingCriteria === '') return;

    if (sortingCriteria !== newSortingCriteria) {
      setSortingCriteria(newSortingCriteria);
      resetToDefaultSortingOrder(newSortingCriteria);
      return;
    }
    toggleSortingOrder();
  }

  const reSortFileDescriptions = useCallback(
    (
      fileDescriptions: FileDescription[],
      setFileDescriptions: React.Dispatch<React.SetStateAction<FileDescription[]>>,
    ) => {
      const newFileDescriptions = getNewlySortedFileDescriptions(fileDescriptions, sortingCriteria, isSortingAscending);
      setFileDescriptions(newFileDescriptions);
    },
    [sortingCriteria, isSortingAscending],
  );

  return { sortingCriteria, isSortingAscending, resetToDefaultSortingOrder, handleSorting, reSortFileDescriptions };
}

export { useSortingOrder };