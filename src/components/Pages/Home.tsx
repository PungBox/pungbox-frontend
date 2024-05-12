import Layout from 'components/Layout/Layout'
import React, { useState } from 'react'
import styles from '/src/components/Module/Home.module.css'; 

const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 파일 선택 핸들러
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  // 파일 드래그 앤 드롭 핸들러
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // 파일 업로드 핸들러
  const handleUpload = () => {
    // 파일 업로드 로직 추가
  };

  return (
    <div className={styles.outercontainer}>
      {/* 드래그 앤 드롭 영역 */}
      <div
        className={styles.dropzone}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        <span>업로드할 파일을 여기에 끌어다 놓으세요.</span>
      </div>

      {/* 파일 선택 input */}
      <input type="file" onChange={handleFileSelect} />

      {/* 업로드 버튼 */}
      <div></div>
      <button 
        className={styles.uploadbotton}
        onClick={handleUpload}>업로드</button>
    </div>
  );
}
export default Home