import { useState } from 'react';
import { FileDescription } from '../../../../../utils/interface';
import { fileListConfig } from '../../../../../utils/config';
import { getUploadUrls, uploadFile } from '../../../../../service/service';

const DUMMY_BUCKET_ID = '001bc76f-436f-4a7e-a1a0-e1ed389e9262';

function getFileNameAndSizeFromFileObject(files: File[]) {
  return files.map((file) => {
    return { fileName: file.name, fileSize: file.size };
  });
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
  
  async function uploadFiles(files: FileList | File[] | null) {
    if (files === null) return;
    if (files instanceof FileList) files = [...files];
    const newFileDescriptions = fileDescriptions.slice();
    const uploadUrls = await getUploadUrls({
      files: getFileNameAndSizeFromFileObject(files),
      bucketId: DUMMY_BUCKET_ID,
    });
    for (const file of files) {
      const urls = (Object.values(uploadUrls).filter((x) => x.fileName === file.name)[0]).urls;
      const uploadResult = await uploadFile(file, urls);
      if (!uploadResult['success']) {
        console.error(`Failed to upload file: ${file}`);
      }
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
