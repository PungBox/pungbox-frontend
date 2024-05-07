import React, { ChangeEvent, useEffect, useState } from 'react';
import { fetchFileDescriptions } from '../../../utils/dummyData';
import { FileDescription } from '../../../utils/interface';
import { FileListTableHeader } from './FileListTableHeader';
import { FileListTableBody } from './FileListTableBody';
import { fileListConfig } from '../../../utils/config';

function getIsDefaultSortingOrderAscending(columnName: string): boolean {
  return fileListConfig.headers.filter((column) => {
    return column.name === columnName;
  })[0].ascending as boolean;
}

const View = () => {
  const storageNumber = 192837;
  const expirationDate = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  const [fileDescriptions, setFileDescriptions] = useState([] as FileDescription[]);
  const [isFileDescriptionsLoaded, setIsFileDescriptionsLoaded] = useState(false);
  const [sortingCriteria, setSortingCriteria] = useState(fileListConfig.defaultSortingCriteria);
  const isDefaultSortingOrderAscending = getIsDefaultSortingOrderAscending(fileListConfig.defaultSortingCriteria);
  const [isSortingAscending, setIsSortingAscending] = useState(!isDefaultSortingOrderAscending);

  useEffect(() => {
    (async (): Promise<FileDescription[]> => {
      return await fetchFileDescriptions();
    })().then((fileDescriptions) => {
      setFileDescriptions(fileDescriptions);
      setIsFileDescriptionsLoaded(true);

      const isDefaultSortingOrderAscending = getIsDefaultSortingOrderAscending(fileListConfig.defaultSortingCriteria);
      setIsSortingAscending(isDefaultSortingOrderAscending);
    });
  }, []);

  useEffect(() => {
    const newFileDescriptions = fileDescriptions.slice();
    const mappings: { [key: string]: 'fileName' | 'fileSize' | 'created' } = {
      name: 'fileName',
      size: 'fileSize',
      date: 'created',
    };
    newFileDescriptions.sort((a, b) => {
      const sortingCriteriaMapping = mappings[sortingCriteria];
      const [aContent, bContent] = [a[sortingCriteriaMapping], b[sortingCriteriaMapping]];
      if (aContent < bContent) {
        return isSortingAscending ? -1 : 1;
      } else if (aContent > bContent) {
        return isSortingAscending ? 1 : -1;
      } else {
        return 0;
      }
    });
    setFileDescriptions(newFileDescriptions);
  }, [sortingCriteria, isSortingAscending]);

  function addFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;
    const file = e.target.files[0];

    const newFileDescriptions = fileDescriptions.slice();
    newFileDescriptions.push({
      fileId: fileDescriptions.length + 1,
      fileName: file.name,
      fileUrl: '',
      fileSize: Math.floor(file.size / 1000),
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    } as FileDescription);

    setFileDescriptions(newFileDescriptions);
  }

  function deleteFile(fileId: number) {
    const newFileDescriptions = fileDescriptions.slice().filter((file) => {
      return file.fileId !== fileId;
    });
    setFileDescriptions(newFileDescriptions);
  }

  function handleSorting(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    const newSortingCriteria = target.className;
    if (sortingCriteria !== newSortingCriteria) {
      setSortingCriteria(newSortingCriteria);
      setIsSortingAscending(getIsDefaultSortingOrderAscending(newSortingCriteria));
      return;
    }
    const newIsSortingAscending = !isSortingAscending;
    setIsSortingAscending(newIsSortingAscending);
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
