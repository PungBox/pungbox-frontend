import { useState } from 'react';
import { completeMultipartUpload, getUploadUrls, uploadFile } from 'service/service';

const useUploadFiles = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleMultiPartUpload = async ({ bucketId, files }: { bucketId: string; files: File[] }) => {
    const urls = await getUploadUrls({
      files: files.map((file) => ({ fileName: file.name, size: file.size })),
      bucketId,
    });

    if (!urls) return;
    for (let i = 0; i < files.length; i++) {
      urls.forEach(async ({ id, fileName, urls, uploadId }) => {
        if (fileName === files[i].name) {
          const parts = await uploadFile({ file: files[i], urls, bucketId, uploadId });
          completeMultipartUpload({ uploadId, bucketId, fileId: id, parts });
        }
      });
    }
  };

  async function uploadFiles({ bucketId, files }: { bucketId: string; files: FileList | File[] | null }) {
    if (!bucketId) return;
    if (files === null) return;
    if (files instanceof FileList) files = [...files];
    setIsUploading(true);
    setHasError(false);
    try {
      await handleMultiPartUpload({ bucketId, files });
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

export default useUploadFiles;
