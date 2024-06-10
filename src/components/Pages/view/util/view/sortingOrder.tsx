import { fileListConfig } from '../../../../../utils/config';

export function getIsDefaultSortingOrderForTheColumnAscending(columnName: string): boolean {
  const column = fileListConfig.headers.filter((column) => {
    return column.name === columnName;
  })[0];
  return column.ascending as boolean;
}

export const isDefaultSortingOrderAscending = getIsDefaultSortingOrderForTheColumnAscending(
  fileListConfig.defaultSortingCriteria,
);
