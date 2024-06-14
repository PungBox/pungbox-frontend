import { useState, useCallback, useEffect } from 'react';
import { GetUploadUrlsResponse, ViewBucketResponse, getUploadUrls, uploadFile, viewBucket } from 'service/service';

function useFileDescription(bucketId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileDescriptions, setFileDescriptions] = useState<ViewBucketResponse[]>([]);

  const fetchFiles = useCallback(() => {
    if (!bucketId) return;
    console.log('?');
    setIsLoading(true);
    viewBucket({ bucketId })
      .then((res) => {
        const { files } = res;
        setFileDescriptions(files);
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
          await uploadFile(files[i], urls, bucketId, uploadId);
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
