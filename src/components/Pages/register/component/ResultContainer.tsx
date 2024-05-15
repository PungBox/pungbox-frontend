import React, { useState } from 'react';

interface ResultContainerProps {
  title: string;
  content: string;
  copyable?: boolean;
}

const ResultContainer = ({ title, content, copyable }: ResultContainerProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = async () => {
    setIsCopied(true);
    await navigator.clipboard.writeText(content);
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  };

  return (
    <>
      <div>{title}</div>
      <div>
        <span>{content}</span>
        {copyable ? (
          <button onClick={copyToClipboard}>
            <span className="material-symbols-outlined">{isCopied ? 'check' : 'link'}</span>
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
