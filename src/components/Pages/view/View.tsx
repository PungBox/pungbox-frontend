import React, { ChangeEvent, useEffect, useState } from 'react';
import { fetchFileDescriptions } from '../../../utils/dummyData';
import { FileDescription } from '../../../utils/interface';
import { FileListTableHeader } from './FileListTableHeader';
import { FileListTableBody } from './FileListTableBody';
import { fileListConfig } from '../../../utils/config';

function getIsDefaultSortingOrderForTheColumnAscending(columnName: string): boolean {
  const column = fileListConfig.headers.filter((column) => {
    return column.name === columnName;
  })[0];
  return column.ascending as boolean;
}

function getNewlySortedFileDescriptions(
  fileDescriptions: FileDescription[],
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

const isDefaultSortingOrderAscending = getIsDefaultSortingOrderForTheColumnAscending(
  fileListConfig.defaultSortingCriteria,
);

const View = () => {
  const storageNumber = 192837;
  const expirationDate = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  const [fileDescriptions, setFileDescriptions] = useState([] as FileDescription[]);
  const [isFileDescriptionsLoaded, setIsFileDescriptionsLoaded] = useState(false);
  const [sortingCriteria, setSortingCriteria] = useState(fileListConfig.defaultSortingCriteria);
  const [isSortingAscending, setIsSortingAscending] = useState(!isDefaultSortingOrderAscending);

  function resetToDefaultSortingOrder(columnName: string): void {
    const isDefaultSortingOrderAscending = getIsDefaultSortingOrderForTheColumnAscending(columnName);
    setIsSortingAscending(isDefaultSortingOrderAscending);
  }

  function displayFileDescriptions(fileDescriptions: FileDescription[]) {
    setFileDescriptions(fileDescriptions);
    setIsFileDescriptionsLoaded(true);
  }

  useEffect(() => {
    (async (): Promise<FileDescription[]> => {
      return await fetchFileDescriptions();
    })().then((fileDescriptions) => {
      displayFileDescriptions(fileDescriptions);
      resetToDefaultSortingOrder(fileListConfig.defaultSortingCriteria);
    });
  }, []);

  function reSortFileDescriptions() {
    const newFileDescriptions = getNewlySortedFileDescriptions(fileDescriptions, sortingCriteria, isSortingAscending);
    setFileDescriptions(newFileDescriptions);
  }

  useEffect(() => {
    reSortFileDescriptions();
  }, [sortingCriteria, isSortingAscending]);

  function getNewFileDescription(file: File) {
    return {
      fileId: fileDescriptions.length + 1,
      fileName: file.name,
      fileUrl: '',
      fileSize: Math.floor(file.size / 1000),
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    } as FileDescription;
  }

  function addFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;
    const file = e.target.files[0];

    const newFileDescriptions = fileDescriptions.slice();
    newFileDescriptions.push(getNewFileDescription(file));
    setFileDescriptions(newFileDescriptions);
  }

  function deleteFile(fileId: number) {
    const newFileDescriptions = fileDescriptions.slice().filter((file) => {
      return file.fileId !== fileId;
    });
    setFileDescriptions(newFileDescriptions);
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

  // TODO: dummy json 사용 중이지만, backend로부터 가져오도록 변경해야 함
  return (
    <div className="view-panel">
      <div className="view-panel-header">
        <p className="storage-number">Storage No. {storageNumber}</p>
        <p className="expiration-date">expiration date: {expirationDate}</p>
      </div>
      <table className="file-list-table">
        <thead>
          <FileListTableHeader
            sortingHandler={handleSorting}
            sortingCriteria={sortingCriteria}
            isSortingAscending={isSortingAscending}
          />
        </thead>
        <tbody>
          <FileListTableBody
            fileDescriptions={fileDescriptions}
            deleteFile={deleteFile}
            isFileDescriptionsLoaded={isFileDescriptionsLoaded}
          />
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <input type="file" onChange={addFile} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default View;
