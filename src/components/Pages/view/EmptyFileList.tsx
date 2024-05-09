import React from 'react';

export const EmptyFileList = () => {
  return (
    <tr>
      <td colSpan={6}>
        <span className="material-symbols-outlined" style={{ fontSize: 'xxx-large' }}>
          unknown_document
        </span>
        <p style={{ fontSize: 'large' }}>파일 없음</p>
      </td>
    </tr>
  );
};
