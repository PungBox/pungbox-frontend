import React from 'react';
import styles from '/src/components/Module/View.module.css';
import {
  FileListProps,
  getFileNameExpression,
  getFileSizeExpression,
  getIconByFileExtension,
  getUploadedDatetimeExpression,
} from '../util/fileList';

export const FileList = ({ fileDescriptions, selected, toggleSelectFile }: FileListProps) => {
  return fileDescriptions.map((file) => {
    const splitted = file.fileName.split('.');
    const extension = splitted[splitted.length - 1];
    return (
      <tr className={styles.checkbox} key={file.fileId} onClick={() => toggleSelectFile(file.fileId)}>
        <td>
          <input type="checkbox" checked={selected[file.fileId]} onChange={() => toggleSelectFile(file.fileId)} />
        </td>
        <td>{getIconByFileExtension(extension)}</td>
        <td>{getFileNameExpression(file.fileName)}</td>
        <td>{getFileSizeExpression(file.fileSize)}</td>
        <td>{getUploadedDatetimeExpression(file.created)}</td>
      </tr>
    );
  });
};
