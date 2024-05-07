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
    // TODO: 이미지를 반환하도록 변경할 예정. file extension 더 추가
    switch (extension) {
      case 'docx':
      case 'txt':
        return '문서';
      case 'png':
      case 'jpg':
      case 'jpeg':
        return '사진';
      case 'zip':
      case 'gz':
        return '압축';
      case 'mov':
      case 'mp4':
      case 'mpeg':
      case 'avi':
        return '동영상';
      case 'mp3':
        return '음악';
      default:
        return '파일';
    }
  }

  function getFileSizeWithSuffix(fileSize: number) {
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

  function getUploadedDatetimeString(created: string) {}

  return fileDescriptions.map((file) => {
    const splitted = file.fileName.split('.');
    const extension = splitted[splitted.length - 1];
    const icon = getIconByFileExtension(extension);
    const fileSize = getFileSizeWithSuffix(file.fileSize);
    const uploadedDatetime = getUploadedDatetimeString(file.created);
    return (
      <tr>
        <td>{icon}</td>
        <td>{file.fileName}</td>
        <td>{fileSize}</td>
        <td>{file.created}</td>
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
