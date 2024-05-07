import React, { useState } from 'react';
import { fileDescriptions } from '../../../utils/dummyData';

function getIconByFileExtension(extension: string) {
  // TODO: 이미지를 반환하도록 변경할 예정.
  switch (extension) {
    case 'doc':
    case 'docx':
    case 'txt':
    case 'hwp':
    case 'odt':
    case 'pages':
      return '문서';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'svg':
    case 'heic':
    case 'psd':
      return '사진';
    case 'zip':
    case 'gz':
    case '7z':
    case 'rar':
      return '압축';
    case 'mov':
    case 'mp4':
    case 'mpg':
    case 'mpeg':
    case 'avi':
    case 'm4v':
    case 'flv':
    case 'wmv':
      return '동영상';
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'flac':
      return '음악';
    case 'xls':
    case 'xlsx':
    case 'csv':
    case 'numbers':
    case 'ods':
      return '시트';
    case 'ppt':
    case 'pptx':
      return '발표';
    case 'pdf':
      return 'PDF';
    default:
      return '파일';
  }
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

export const FileList = () => {
  // TODO: dummy json 사용 중이지만, backend로부터 가져오도록 변경해야 함
  const initialSelected: { [key: number]: boolean } = {};
  fileDescriptions.forEach((file) => {
    initialSelected[file.fileId] = false;
  });
  const [selected, setSelected] = useState(initialSelected);
  const downloadFile = (url: string) => {
    window.location.href = url;
  };
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
          <input type="checkbox" checked={selected[file.fileId]} />
        </td>
        <td>{getIconByFileExtension(extension)}</td>
        <td>{file.fileName}</td>
        <td>{getFileSizeExpression(file.fileSize)}</td>
        <td>{getUploadedDatetimeExpression(file.created)}</td>
        <td>
          <button onClick={() => downloadFile(file.fileUrl)}>
            <img src="src/assets/download.png" alt="download" width={20} />
          </button>
        </td>
      </tr>
    );
  });
};
