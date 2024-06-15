import { useCallback, useEffect, useState } from 'react';
import { getUploadUrls, uploadFile, viewBucket } from 'service/service';
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

  async function uploadFiles(files: FileList | File[] | null) {
    if (files === null) return;
    if (files instanceof FileList) files = [...files];
    const fileNamesAndSizes = files.map((file: File) => {
      const { name, size } = file;
      return { fileName: name, size: size };
    });
    const urls = await getUploadUrls({ files: fileNamesAndSizes, bucketId });

    for (let i = 0; i < files.length; i++) {
      urls.forEach(async ({ id, fileName, urls, uploadId }) => {
        if (fileName === files[i].name) {
          await uploadFile({ file: files[i], urls, bucketId, uploadId });
        }
      });
    }
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
    isLoading,
    fetchFiles,
    uploadFiles,
    deleteFiles,
  };
}

export default useFileDescription;
