import { useState } from 'react';
import { completeMultipartUpload, getUploadUrls, uploadFile } from 'service/service';

const useUpadteFiles = (bucketId: string) => {
  const [isUploading, setIsUploading] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function uploadFiles(files: FileList | File[] | null) {
    if (!bucketId) return;
    if (files === null) return;
    if (files instanceof FileList) files = [...files];
    const fileNamesAndSizes = files.map((file: File) => {
      const { name, size } = file;
      return { fileName: name, size: size };
    });
    setIsUploading(true);
    setHasError(false);
    try {
      const urls = await getUploadUrls({ files: fileNamesAndSizes, bucketId });

      if (!urls) return;
      for (let i = 0; i < files.length; i++) {
        urls.forEach(async ({ id, fileName, urls, uploadId }) => {
          if (fileName === files[i].name) {
            const parts = await uploadFile({ file: files[i], urls, bucketId, uploadId });
            completeMultipartUpload({ uploadId, bucketId, fileId: id, parts });
          }
        });
      }
    } catch (e) {
      console.error(e);
      setHasError(true);
    }
    setIsUploading(false);
  }

  return {
    isUploading,
    hasError,
    uploadFiles,
  };
};

export default useUpadteFiles;
