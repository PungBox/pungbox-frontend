import { FileList } from './FileList';
import { EmptyFileList } from './EmptyFileList';
import { LoadingFileList } from './LoadingFileList';
import React from 'react';
import { FileDescription } from '../../../../utils/interface';

interface FileListTableBodyProps {
  fileDescriptions: FileDescription[];
  deleteFile: (fileId: number) => void;
  isFileDescriptionsLoaded: boolean;
}

export const FileListTableBody = ({
  fileDescriptions,
  deleteFile,
  isFileDescriptionsLoaded,
}: FileListTableBodyProps) => {
  return fileDescriptions.length === 0 ? (
    isFileDescriptionsLoaded ? (
      <EmptyFileList />
    ) : (
      <LoadingFileList />
    )
  ) : (
    <FileList fileDescriptions={fileDescriptions} deleteFile={deleteFile} />
  );
};
