import { useState } from 'react';

const useDownloadFiles = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadFiles = async (selectedFileIds: string[]) => {};

  return { isDownloading, downloadFiles };
};

export default useDownloadFiles;
