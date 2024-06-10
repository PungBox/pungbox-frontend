import React from 'react';
import { FileDescription } from '../../../../utils/interface';
import { ViewBucketResponse } from 'service/service';

interface FileListProps {
  fileDescriptions: ViewBucketResponse[];
  selected: { [key: string]: boolean };
  toggleSelectFile: (fileId: string) => void;
}

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

export type { FileListProps };
export { getIconByFileExtension, getFileNameExpression, getFileSizeExpression, getUploadedDatetimeExpression };
