import { FileList } from './FileList';
import { EmptyFileList } from './EmptyFileList';
import { LoadingFileList } from './LoadingFileList';
import { ViewBucketResponse } from 'service/interface';

interface FileListTableBodyProps {
  fileDescriptions: ViewBucketResponse[];
  isLoading: boolean;
  selected: { [key: string]: boolean };
  toggleSelectFile: (fileId: string) => void;
}

export const FileListTableBody = ({
                                    fileDescriptions,
                                    isLoading,
                                    selected,
                                    toggleSelectFile,
                                  }: FileListTableBodyProps) => {
  console.log(isLoading, fileDescriptions);
  return isLoading ? (
    <LoadingFileList />
  ) : fileDescriptions?.length === 0 ? (
    <EmptyFileList />
  ) : (
    <FileList fileDescriptions={fileDescriptions} selected={selected} toggleSelectFile={toggleSelectFile} />
  );
};
