import { useState, useCallback, useEffect } from 'react';
import { viewBucket } from 'service/service';
import { FileDescription } from 'utils/interface';

function useFileDescription(bucketId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileDescriptions, setFileDescriptions] = useState([] as FileDescription[]);

  const fetchFiles = useCallback(() => {
    if (!bucketId) return;

    setIsLoading(true);
    viewBucket({ bucketId })
      .then((res) => {
        const { files } = res;
        setFileDescriptions(files);
        // resetToDefaultSortingOrder(fileListConfig.defaultSortingCriteria);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    fileDescriptions,
    setFileDescriptions,
    isLoading,
    fetchFiles,
  };
}

export default useFileDescription;
