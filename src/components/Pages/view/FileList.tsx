import React, { useState } from 'react';

import {
  downloadFile,
  FileListProps,
  getFileNameExpression,
  getFileSizeExpression,
  getIconByFileExtension,
  getUploadedDatetimeExpression,
} from './util/fileList';

export const FileList = ({ fileDescriptions, deleteFile }: FileListProps) => {
  const [selected, setSelected] = useState(
    fileDescriptions.reduce((acc, file) => ({ ...acc, [file.fileId]: false }), {}) as { [key: number]: boolean },
  );

  const toggleSelectFile = (fileId: number) => {
    const newSelected = JSON.parse(JSON.stringify(selected));
    newSelected[fileId] = !newSelected[fileId];
    setSelected(newSelected);
  };

  return fileDescriptions.map((file) => {
    const splitted = file.fileName.split('.');
    const extension = splitted[splitted.length - 1];
    return (
      <tr key={file.fileId} onClick={() => toggleSelectFile(file.fileId)}>
        <td>
          <input type="checkbox" checked={selected[file.fileId]} onChange={() => toggleSelectFile(file.fileId)} />
        </td>
        <td>{getIconByFileExtension(extension)}</td>
        <td>{getFileNameExpression(file.fileName)}</td>
        <td>{getFileSizeExpression(file.fileSize)}</td>
        <td>{getUploadedDatetimeExpression(file.created)}</td>
        <td>
          <button onClick={() => downloadFile(file.fileUrl)}>
            <span className="material-symbols-outlined">download</span>
          </button>
        </td>
        <td>
          <button onClick={() => deleteFile(file.fileId)}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </td>
      </tr>
    );
  });
};
