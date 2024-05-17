import { useState } from 'react';
import { FileDescription } from '../../../../../utils/interface';

function useSelected(fileDescriptions: FileDescription[]) {
  const [selected, setSelected] = useState(
    fileDescriptions.reduce((acc, file) => ({ ...acc, [file.fileId]: false }), {}) as { [key: number]: boolean },
  );
  
  const toggleSelectFile = (fileId: number) => {
    const newSelected = JSON.parse(JSON.stringify(selected));
    newSelected[fileId] = !newSelected[fileId];
    setSelected(newSelected);
  };
  
  return { selected, toggleSelectFile };
}

export { useSelected };