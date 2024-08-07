import { useCallback, useEffect, useState } from 'react';
import { viewBucket } from 'service/service';
import { UnauthorizedException } from 'service/exception';
import { ViewBucketResponse } from 'service/interface';
import { useNavigate } from 'react-router-dom';

function useFileDescription(bucketId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileDescriptions, setFileDescriptions] = useState<ViewBucketResponse[]>([]);
  const navigate = useNavigate();

  const fetchFiles = useCallback(() => {
    if (!bucketId) return;
    setIsLoading(true);
    viewBucket({ bucketId })
      .then((res) => {
        const { files } = res;
        setFileDescriptions(files || []);
        // resetToDefaultSortingOrder(fileListConfig.defaultSortingCriteria);
      })
      .catch((e) => {
        if (e instanceof UnauthorizedException) navigate('/authenticate', { state: { referrer: '/view' } });
        else console.error(JSON.stringify(e));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [bucketId]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  return {
    fileDescriptions,
    setFileDescriptions,
    isLoading,
    fetchFiles,
  };
}

export default useFileDescription;
