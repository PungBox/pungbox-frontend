import { FileList } from './FileList';
import { EmptyFileList } from './EmptyFileList';
import { LoadingFileList } from './LoadingFileList';
import React from 'react';
import { FileDescription } from '../../../../utils/interface';

interface FileListTableBodyProps {
  fileDescriptions: FileDescription[];
  isFileDescriptionsLoaded: boolean;
  selected: { [key: string]: boolean };
  toggleSelectFile: (fileId: string) => void;
}

export const FileListTableBody = (
  {
    fileDescriptions,
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
    <FileList fileDescriptions={fileDescriptions} selected={selected} toggleSelectFile={toggleSelectFile} />
  );
};
