import { ChangeEvent, useState } from 'react';
import { FileDescription } from '../../../../../utils/interface';
import { fileListConfig } from '../../../../../utils/config';

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

function useFileDescription() {
  const [fileDescriptions, setFileDescriptions] = useState([] as FileDescription[]);
  const [isFileDescriptionsLoaded, setIsFileDescriptionsLoaded] = useState(false);

  function displayFileDescriptions(fileDescriptions: FileDescription[]) {
    setFileDescriptions(fileDescriptions);
    setIsFileDescriptionsLoaded(true);
  }

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

  return {
    fileDescriptions,
    setFileDescriptions,
    isFileDescriptionsLoaded,
    displayFileDescriptions,
    addFile,
    deleteFile,
  };
}

export { useFileDescription, getNewlySortedFileDescriptions };