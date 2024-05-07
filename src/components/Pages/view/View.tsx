import React from 'react';
import { FileList } from './FileList';

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
            <th>{/*checkbox*/}</th>
            <th>{/*icon*/}</th>
            <th>name</th>
            <th>size</th>
            <th>upload date</th>
            <th>{/*download*/}</th>
            <th>{/*delete*/}</th>
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
