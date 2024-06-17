import { useEffect, useMemo, useState } from 'react';
import { ViewBucketResponse } from 'service/interface';

function useSelectedFiles(fileDescriptions: ViewBucketResponse[] = []) {
  const [selected, setSelected] = useState(
    fileDescriptions.reduce((acc, file) => ({ ...acc, [file.id]: false }), {}) as { [key: string]: boolean },
  );

  useEffect(() => {
    setSelected(fileDescriptions.reduce((acc, file) => ({ ...acc, [file.id]: false }), {}));
  }, [fileDescriptions]);

  const selectedFileIds = useMemo(() => {
    console.log(selected);
    return Object.keys(selected).filter((key) => (selected[key] ? key : false));
  }, [selected]);

  const toggleSelectFile = (fileId: string) => {
    console.log(fileId);

    setSelected((prev) => ({ ...prev, [fileId]: !prev[fileId] }));
  };

  return { selected, selectedFileIds, toggleSelectFile };
}

export default useSelectedFiles;
