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
  let fileList = <FileList fileDescriptions={fileDescriptions} deleteFile={deleteFile} />;
  if (fileDescriptions.length === 0) {
    if (isFileDescriptionsLoaded) {
      fileList = <EmptyFileList />;
    } else {
      fileList = <LoadingFileList />;
    }
  }
  return fileList;
};
