import { useState } from 'react';
import { ViewBucketResponse } from 'service/interface';

function useSelectedFiles(fileDescriptions: ViewBucketResponse[] = []) {
  const [selected, setSelected] = useState(
    fileDescriptions.reduce((acc, file) => ({ ...acc, [file.id]: false }), {}) as { [key: string]: boolean },
  );
  
  function getSelectedFileIds() {
    return Object.keys(selected).filter((key) => (selected[key] ? key : false));
  }
  
  const toggleSelectFile = (fileId: string) => {
    const newSelected = JSON.parse(JSON.stringify(selected));
    newSelected[fileId] = !newSelected[fileId];
    setSelected(newSelected);
  };
  
  return { selected, getSelectedFileIds, toggleSelectFile };
}

export default useSelectedFiles;
