import React from 'react';

interface ResultContainerProps {
  title: string;
  content: string;
  copyable?: boolean;
}

const ResultContainer = ({ title, content, copyable }: ResultContainerProps) => {
  const copyToClipboard = () => {};

  return (
    <>
      <div>{title}</div>
      <div>
        <span>{content}</span>
        {copyable ? (
          <button onClick={copyToClipboard}>
            <span className="material-symbols-outlined">link</span>
          </button>
        ) : (
          <></>
        )}
      </div>
      <br />
    </>
  );
};

export default ResultContainer;
