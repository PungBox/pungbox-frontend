import React, { useState } from 'react';

import { FileDescription } from '../../../utils/interface';
import { EmptyFileList } from './EmptyFileList';

function getIconByFileExtension(extension: string) {
  switch (extension) {
    case 'doc':
    case 'docx':
    case 'txt':
    case 'hwp':
    case 'odt':
    case 'pages':
      return <span className="material-symbols-outlined">description</span>;
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'svg':
    case 'heic':
    case 'psd':
      return <span className="material-symbols-outlined">image</span>;
    case 'zip':
    case 'gz':
    case '7z':
    case 'rar':
      return <span className="material-symbols-outlined">folder_zip</span>;
    case 'mov':
    case 'mp4':
    case 'mpg':
    case 'mpeg':
    case 'avi':
    case 'm4v':
    case 'flv':
    case 'wmv':
      return <span className="material-symbols-outlined">movie</span>;
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'flac':
      return <span className="material-symbols-outlined">music_note</span>;
    case 'xls':
    case 'xlsx':
    case 'csv':
    case 'numbers':
    case 'ods':
      return <span className="material-symbols-outlined">table_view</span>;
    case 'ppt':
    case 'pptx':
      return <span className="material-symbols-outlined">present_to_all</span>;
    case 'pdf':
      return <span className="material-symbols-outlined">picture_as_pdf</span>;
    default:
      return <span className="material-symbols-outlined">draft</span>;
  }
}

function getFileNameExpression(fileName: string) {
  return fileName.length <= 30 ? fileName : fileName.substring(0, 27) + '...';
}

function getFileSizeExpression(fileSize: number) {
  if (fileSize < 1e3) {
    return `${fileSize} KB`;
  } else if (fileSize < 1e6) {
    return `${Math.floor(fileSize / 1e2) / 10} MB`;
  } else if (fileSize < 1e9) {
    return `${Math.floor(fileSize / 1e5) / 10} GB`;
  } else {
    return `${Math.floor(fileSize / 1e8) / 10} TB`;
  }
}

function getDateExpression(now: Date, uploadedDatetime: Date) {
  if (now.getDate() === uploadedDatetime.getDate()) {
    return '오늘';
  } else if (now.getDate() === uploadedDatetime.getDate() + 1) {
    return '어제';
  } else {
    return `${uploadedDatetime.getMonth() + 1}월 ${uploadedDatetime.getDate()}일`;
  }
}

function getUploadedDatetimeExpression(created: string) {
  const now = new Date();
  let datetime;
  try {
    datetime = new Date(created);
  } catch (RangeError) {
    return null;
  }

  let dateExpression = getDateExpression(now, datetime);
  const timeExpression = `${datetime.toLocaleTimeString()}`;
  return `${dateExpression} ${timeExpression}`;
}

function downloadFile(url: string): void {
  window.location.href = url;
}

interface FileListProps {
  fileDescriptions: FileDescription[];
  deleteFile: (fileId: number) => void;
}

export const FileList = ({ fileDescriptions, deleteFile }: FileListProps) => {
  const initialSelected: { [key: number]: boolean } = {};
  fileDescriptions.forEach((file) => {
    initialSelected[file.fileId] = false;
  });
  const [selected, setSelected] = useState(initialSelected);

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
