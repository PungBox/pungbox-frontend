import { useState } from 'react';
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
      id: '',
      fileName: file.name,
      fileSize: Math.floor(file.size / 1000),
      merged: false,
      deleted: false,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
    };
  }
  
  function uploadFiles(files: FileList | File[] | null) {
    if (files === null) return;
    const newFileDescriptions = fileDescriptions.slice();
    for (const file of files) {
      newFileDescriptions.push(getNewFileDescription(file));
    }
    setFileDescriptions(newFileDescriptions);
  }
  
  function deleteFiles(fileIds: string[]) {
    const newFileDescriptions = fileDescriptions.slice().filter((file) => {
      return !fileIds.includes(file.id);
    });
    setFileDescriptions(newFileDescriptions);
  }
  
  return {
    fileDescriptions,
    setFileDescriptions,
    isFileDescriptionsLoaded,
    displayFileDescriptions,
    uploadFiles,
    deleteFiles,
  };
}

export { useFileDescription, getNewlySortedFileDescriptions };
