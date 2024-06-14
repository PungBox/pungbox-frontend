import { useCallback, useState } from 'react';
import { fileListConfig } from 'utils/config';
import { getNewlySortedFileDescriptions } from '../util/view/fileDescription';
import {
  getIsDefaultSortingOrderForTheColumnAscending,
  isDefaultSortingOrderAscending,
} from '../util/view/sortingOrder';
import { ViewBucketResponse } from 'service/interface';

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
      fileDescriptions: ViewBucketResponse[],
      setFileDescriptions: React.Dispatch<React.SetStateAction<ViewBucketResponse[]>>,
    ) => {
      const newFileDescriptions = getNewlySortedFileDescriptions(fileDescriptions, sortingCriteria, isSortingAscending);
      setFileDescriptions(newFileDescriptions);
    },
    [sortingCriteria, isSortingAscending],
  );
  
  return { sortingCriteria, isSortingAscending, resetToDefaultSortingOrder, handleSorting, reSortFileDescriptions };
}

export default useSortingOrder;
