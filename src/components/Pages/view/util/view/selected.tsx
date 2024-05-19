import { useState } from 'react';
import { FileDescription } from '../../../../../utils/interface';

function useSelected(fileDescriptions: FileDescription[]) {
  const [selected, setSelected] = useState(
    fileDescriptions.reduce((acc, file) => ({ ...acc, [file.fileId]: false }), {}) as { [key: number]: boolean },
  );
  
  function getSelectedFileIds() {
    return Object.keys(selected)
      .map((key) => parseInt(key))
      .filter((key) => selected[key] ? key : false);
  }
  
  function getSelectedFileUrls(fileDescriptions: FileDescription[]) {
    const fileIds = getSelectedFileIds();
    return fileDescriptions
      .map((file) => (fileIds.includes(file.fileId)) ? file.fileUrl : null)
      .filter((x) => x !== null) as string[];
  }
  
  const toggleSelectFile = (fileId: number) => {
    const newSelected = JSON.parse(JSON.stringify(selected));
    newSelected[fileId] = !newSelected[fileId];
    setSelected(newSelected);
  };
  
  return { selected, getSelectedFileIds, getSelectedFileUrls, toggleSelectFile };
}

export { useSelected };