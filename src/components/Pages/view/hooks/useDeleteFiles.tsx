import { SetStateAction, useState } from 'react';
import { ViewBucketResponse } from 'service/interface';
import { deleteFilesAPI } from 'service/service';

const useDeleteFiles = ({
  setFileDescriptions,
}: {
  setFileDescriptions: React.Dispatch<SetStateAction<ViewBucketResponse[]>>;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteFiles({ bucketId, fileIds }: { bucketId: string; fileIds: string[] }) {
    try {
      setIsDeleting(true);
      await deleteFilesAPI({ bucketId, fileIds });
      setFileDescriptions((prev) =>
        prev.slice().filter((file) => {
          return !fileIds.includes(file.id);
        }),
      );

      setIsDeleting(false);
    } catch (e) {
      console.error(e);
    }
  }
  return {
    deleteFiles,
    isDeleting,
  };
};

export default useDeleteFiles;
