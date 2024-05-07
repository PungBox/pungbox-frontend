import React, { ChangeEvent, useEffect, useState } from 'react';
import { FileList } from './FileList';
import { fetchFileDescriptions } from '../../../utils/dummyData';
import { FileDescription } from '../../../utils/interface';
import { EmptyFileList } from './EmptyFileList';
import { LoadingFileList } from './LoadingFileList';

const View = () => {
  const storageNumber = 192837;
  const expirationDate = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  const [fileDescriptions, setFileDescriptions] = useState([] as FileDescription[]);
  const [isFileDescriptionsLoaded, setIsFileDescriptionsLoaded] = useState(false);

  useEffect(() => {
    (async (): Promise<FileDescription[]> => {
      return await fetchFileDescriptions();
    })().then((fileDescriptions) => {
      setFileDescriptions(fileDescriptions);
      setIsFileDescriptionsLoaded(true);
    });
  }, []);

  function addFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files === null) return;
    const file = e.target.files[0];

    const newFileDescriptions = fileDescriptions.slice();
    newFileDescriptions.push({
      fileId: fileDescriptions.length + 1,
      fileName: file.name,
      fileUrl: '',
      fileSize: Math.floor(file.size / 1000),
      created: new Date().toISOString(),
      modified: new Date().toISOString(),
    } as FileDescription);

    setFileDescriptions(newFileDescriptions);
  }

  function deleteFile(fileId: number) {
    const newFileDescriptions = fileDescriptions.slice().filter((file) => {
      return file.fileId !== fileId;
    });
    setFileDescriptions(newFileDescriptions);
  }

  let fileList = <FileList fileDescriptions={fileDescriptions} deleteFile={deleteFile} />;
  if (fileDescriptions.length === 0) {
    if (isFileDescriptionsLoaded) {
      fileList = <EmptyFileList />;
    } else {
      fileList = <LoadingFileList />;
    }
  }

  // TODO: dummy json 사용 중이지만, backend로부터 가져오도록 변경해야 함
  return (
    <div className="view-panel">
      <div className="view-panel-header">
        <p className="storage-number">Storage No. {storageNumber}</p>
        <p className="expiration-date">expiration date: {expirationDate}</p>
      </div>
      <table className="file-list-table">
        <thead>
          <tr>
            <th>{/*checkbox*/}</th>
            <th>{/*icon*/}</th>
            <th>name</th>
            <th>size</th>
            <th>upload date</th>
            <th>{/*download*/}</th>
            <th>{/*delete*/}</th>
          </tr>
        </thead>
        <tbody>{fileList}</tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <input type="file" onChange={addFile} />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default View;
