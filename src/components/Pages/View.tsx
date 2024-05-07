import React from 'react';

interface FileDescription {
  fileId: number;
  fileName: string;
  file: string;
  fileSize: number;
  created: string;
  modified: string;
}

const FileList = () => {
  // TODO: dummy json 사용 중이지만, backend로부터 가져오도록 변경해야 함
  const fileDescriptions: FileDescription[] = [
    {
      fileId: 1,
      fileName: 'file1',
      file: '',
      fileSize: 1376,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    },
    {
      fileId: 2,
      fileName: 'document1.docx',
      file: '',
      fileSize: 35642,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    },
    {
      fileId: 3,
      fileName: 'zipfile.zip',
      file: '',
      fileSize: 434632,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    },
    {
      fileId: 4,
      fileName: 'picture.png',
      file: '',
      fileSize: 12483,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    },
    {
      fileId: 5,
      fileName: 'movie.mov',
      file: '',
      fileSize: 8452321,
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    },
  ];
  
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
  
  function getUploadedDatetimeExpression(created: string) {
    const now = new Date();
    let datetime;
    try {
      datetime = new Date(created);
    } catch (RangeError) {
      return null;
    }
    
    let dateExpression;
    if (now.getDate() === datetime.getDate()) {
      dateExpression = '오늘';
    } else if (now.getDate() === datetime.getDate() + 1) {
      dateExpression = '어제';
    } else {
      dateExpression = `${datetime.getMonth() + 1}월 ${datetime.getDate()}일`;
    }
    
    const timeExpression = `${datetime.toLocaleTimeString()}`;
    
    return `${dateExpression} ${timeExpression}`;
  }
  
  return fileDescriptions.map((file) => {
    const splitted = file.fileName.split('.');
    const extension = splitted[splitted.length - 1];
    const icon = getIconByFileExtension(extension);
    const fileSize = getFileSizeExpression(file.fileSize);
    const uploadedDatetime = getUploadedDatetimeExpression(file.created);
    return (
      <tr>
        <td>{icon}</td>
        <td>{file.fileName}</td>
        <td>{fileSize}</td>
        <td>{uploadedDatetime}</td>
      </tr>
    );
  });
};

const View = () => {
  const storageNumber = 192837;
  const expirationDate = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  
  return (
    <div className="view-panel">
      <div className="view-panel-header">
        <p className="storage-number">Storage No. {storageNumber}</p>
        <p className="expiration-date">expiration date: {expirationDate}</p>
      </div>
      <table className="file-list-table">
        <thead>
        <tr>
          <th></th>
          <th>name</th>
          <th>size</th>
          <th>upload date</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <FileList />
        </tbody>
      </table>
    </div>
  );
};

export default View;
