import React from 'react';
import { fileListConfig as config } from '../../../../utils/config';
import { downloadFile, FileListTableHeaderProps, getSorters } from '../util/fileListTableHeader';


export const FileListTableHeader = (
  {
    handleSorting,
    sortingCriteria,
    isSortingAscending,
    fileDescriptions,
    selected,
    deleteFile,
  }: FileListTableHeaderProps,
) => {
  const sorters = getSorters(sortingCriteria, isSortingAscending);
  
  return (
    <div>
      <div>
        <button onClick={() => downloadFile(file.fileUrl)}>
          <span className="material-symbols-outlined">download</span>
        </button>
        <button onClick={() => deleteFile(file.fileId)}>
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
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
    </div>
  );
};
