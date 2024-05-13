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
      <div className={styles.innercontainer}>
        {/* 드래그 앤 드롭 영역 */}
        <div
          className={styles.dropzone}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
        <img className={styles.uploadicon} src="src/assets/icon/free-icon-cloud-database-7734276.png" />
        <span >업로드할 파일을 여기에 끌어다 놓으세요.</span>
        </div>
        {/* 파일 or 폴더 선택 버튼 */}
        <input type="file" onChange={handleFileSelect} multiple={true} directory={true} webkitdirectory={true} />  
      </div>
     
      <div style={{ textAlign: 'center' }}>
        <button className={styles.uploadbutton} onClick={handleUpload}>UPLOAD FILE</button>
      </div>
    </div>
  );
}
export default Home