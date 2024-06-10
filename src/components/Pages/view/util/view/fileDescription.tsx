import { useState } from 'react';
import { FileDescription } from '../../../../../utils/interface';
import { fileListConfig } from '../../../../../utils/config';
import { ViewBucketResponse } from 'service/service';

function getNewlySortedFileDescriptions(
  fileDescriptions: ViewBucketResponse[],
  sortingCriteria: string,
  isSortingAscending: boolean,
) {
  const result = fileDescriptions.slice();
  result.sort((a, b) => {
    const sortingCriteriaMapping = fileListConfig.mappings[sortingCriteria];
    const [aContent, bContent] = [a[sortingCriteriaMapping], b[sortingCriteriaMapping]];
    if (aContent < bContent) {
      return isSortingAscending ? -1 : 1;
    } else if (aContent > bContent) {
      return isSortingAscending ? 1 : -1;
    } else {
      return 0;
    }
  });
  return result;
}

export { getNewlySortedFileDescriptions };
