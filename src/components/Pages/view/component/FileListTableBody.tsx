import { FileList } from './FileList';
import { EmptyFileList } from './EmptyFileList';
import { LoadingFileList } from './LoadingFileList';
import React from 'react';
import { FileDescription } from '../../../../utils/interface';

interface FileListTableBodyProps {
  fileDescriptions: FileDescription[];
  deleteFile: (fileId: number) => void;
  isFileDescriptionsLoaded: boolean;
  selected: { [key: number]: boolean };
  toggleSelectFile: (fileId: number) => void;
}

export const FileListTableBody = (
  {
    fileDescriptions,
    deleteFile,
    isFileDescriptionsLoaded,
    selected,
    toggleSelectFile,
  }: FileListTableBodyProps,
) => {
  
  return fileDescriptions.length === 0 ? (
    isFileDescriptionsLoaded ? (
      <EmptyFileList />
    ) : (
      <LoadingFileList />
    )
  ) : (
    <FileList fileDescriptions={fileDescriptions} deleteFile={deleteFile} selected={selected}
              toggleSelectFile={toggleSelectFile} />
  );
};
