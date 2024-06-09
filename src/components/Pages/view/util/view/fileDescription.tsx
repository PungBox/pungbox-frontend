import { useState } from 'react';
import { FileDescription } from '../../../../../utils/interface';
import { fileListConfig } from '../../../../../utils/config';
import { ViewBucketResponse } from '../../../../../service/service';

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
  
  function fileDescriptionFromFileObject(file: File) {
    return {
      id: '',
      fileName: file.name,
      fileSize: Math.floor(file.size / 1000),
      merged: false,
      deleted: false,
      createdAt: new Date().toISOString(),
      modifiedAt: new Date().toISOString(),
      type: file.type,
    };
  }
  
  function fileDescriptionFromFetchResult(file: ViewBucketResponse) {
    return {
      id: file.id,
      fileName: file.fileName,
      fileSize: Math.floor(file.fileSize / 1000),
      createdAt: file.createdAt,
      modifiedAt: null,
      merged: file.merged,
      deleted: file.deleted,
      type: file.type,
    } as FileDescription;
  }
  
  function uploadFiles(files: FileList | File[] | null) {
    if (files === null) return;
    if (files instanceof FileList) files = [...files];
    
    const newFileDescriptions = fileDescriptions.slice();
    for (const file of files) {
      newFileDescriptions.push(fileDescriptionFromFileObject(file));
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
    fileDescriptionFromFetchResult,
    uploadFiles,
    deleteFiles,
  };
}

export { useFileDescription, getNewlySortedFileDescriptions };
