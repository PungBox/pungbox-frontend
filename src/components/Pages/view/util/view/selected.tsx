import { useState } from 'react';
import { FileDescription } from '../../../../../utils/interface';

function useSelected(fileDescriptions: FileDescription[]) {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    fileDescriptions.reduce((acc, file) => ({ ...acc, [file.id]: false }), {}) as { [key: number]: boolean },
  );

  function getSelectedFileIds() {
    return Object.keys(selected).filter((key) => (selected[key] ? key : false));
  }

  const toggleSelectFile = (fileId: number) => {
    const newSelected = JSON.parse(JSON.stringify(selected));
    newSelected[fileId] = !newSelected[fileId];
    setSelected(newSelected);
  };

  return { selected, getSelectedFileIds, toggleSelectFile };
}

export { useSelected };
