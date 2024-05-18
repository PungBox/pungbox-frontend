import React, { useState } from 'react';
import styles from '/src/components/Module/Register.module.css';

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
    <div className={styles.resultContainer}>
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        <span>{content}</span>
        {copyable ? (
          <button className={styles.copyButton} onClick={copyToClipboard}>
            <span className="material-symbols-outlined">{isCopied ? 'check' : 'link'}</span>
          </button>
        ) : (
          <></>
        )}
      </div>
      <br />
    </div>
  );
};

export default ResultContainer;
