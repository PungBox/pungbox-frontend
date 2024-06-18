import { useState } from 'react';
import { getDownloadUrls } from 'service/service';

const useDownloadFiles = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadFiles = async ({ bucketId, fileIds }: { bucketId: string; fileIds: string[] }) => {
    setIsDownloading(true);
    const urls = await getDownloadUrls({ bucketId, fileIds });
    Object.values(urls).forEach((url) => window.open(url));
    setIsDownloading(false);
  };

  return { isDownloading, downloadFiles };
};

export default useDownloadFiles;
