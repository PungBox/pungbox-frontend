import { useState } from 'react';
import { FileDescription } from '../../../../../utils/interface';

function useSelected(fileDescriptions: FileDescription[]) {
  const [selected, setSelected] = useState(
    fileDescriptions.reduce((acc, file) => ({ ...acc, [file.id]: false }), {}) as { [key: string]: boolean },
  );
  
  function getSelectedFileIds() {
    return Object.keys(selected)
      .filter((key) => selected[key] ? key : false);
  }
  
  function getSelectedFileUrls(fileDescriptions: FileDescription[]) {
    const fileIds = getSelectedFileIds();
    return fileDescriptions
      .map((file) => (fileIds.includes(file.id)) ? file.id : null)
      .filter((x) => x !== null) as string[];
  }
  
  const toggleSelectFile = (fileId: string) => {
    const newSelected = JSON.parse(JSON.stringify(selected));
    newSelected[fileId] = !newSelected[fileId];
    setSelected(newSelected);
  };
  
  return { selected, getSelectedFileIds, getSelectedFileUrls, toggleSelectFile };
}

export { useSelected };