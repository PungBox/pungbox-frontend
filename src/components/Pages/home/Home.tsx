// Home.tsx
import React, {
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import useDragAndDrop from './UseDragDrop';
import styles from '/src/components/Module/Home.module.css'; 
import iconExpand from '/src/assets/images/icon_expand.svg';
import iconCollapse from '/src/assets/images/icon_collapse.svg';
import { getPresignedUrl } from 'service/service';
import { Link } from 'react-router-dom';
import { uploadUrl } from 'assets/imageUrls';

interface IFileTypes {
  id: number;
  object: File;
}

const Home = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<IFileTypes[]>([]);
  const [showFiles, setShowFiles] = useState<boolean>(false);

  const nextFileId = useRef<number>(0);

  const handleDragStart = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragEnd = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    onChangeFiles(e);
  };

  const onChangeFiles = async (e: ChangeEvent<HTMLInputElement> | any) => {
    let selectFiles: File[] = [];
    let tempFiles: IFileTypes[] = files;

    if (e.type === 'drop') {
      selectFiles = e.dataTransfer.files;
    } else {
      selectFiles = e.target.files;
    }

    for (const file of selectFiles) {
      tempFiles = [
        ...tempFiles,
        {
          id: nextFileId.current++,
          object: file,
        },
      ];
    }

    // !!!임시로 주석 처리 해놓음!!!
    // const urls = await getPresignedUrl({
    //   files: selectFiles,
    //   // @TODO: bucketName을 변경하세요.
    //   bucketName: 'pungbox-test-bucket',
    // })

    // console.log(urls);
    setFiles(tempFiles);
  };

  const handleFilterFile = (id: number) => {
    setFiles(files.filter((file: IFileTypes) => file.id !== id));
  };

  const toggleFilesVisibility = () => {
    setShowFiles(!showFiles);
  };

  const { dragRef } = useDragAndDrop(
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop
  );
  
  return (
    <div className={styles.outercontainer}>
      <div className={styles.innercontainer}>
        {/* 드래그 앤 드롭 영역 */}
        <input
          type="file"
          id="fileUpload"
          style={{ display: 'none' }}
          multiple={true}
          onChange={onChangeFiles}
        />
        <label
          className={`${styles.dropzone} ${isDragging ? 'active' : ''}`}
          htmlFor="fileUpload"
          ref={dragRef}
        >
          <img className={styles.uploadicon} src={uploadUrl} />
          <span>클릭 또는 파일을 이곳에 드롭하세요.</span>
        </label>

        <button className={styles.filelistbutton} onClick={toggleFilesVisibility}>
          {showFiles ? <img src={iconCollapse} alt="Collapse" /> : <img src={iconExpand} alt="Expand" />}
          <span>Uploaded file list</span>
        </button>
        <div className={styles.dragdropFiles} style={{ display: showFiles ? 'block' : 'none' }}>
          {files.map((file: IFileTypes) => {
            const {
              id,
              object: { name } 
            } = file;

            return (
              <div key={id}>
                <div>{name}</div>
                <div
                  className={styles.dragdropFilesFilter}
                  onClick={() => handleFilterFile(id)}
                >
                  X
                </div>
              </div>
            );
          })}
        </div>
      </div>
     
      <div style={{ textAlign: 'center' }}>
        <Link to="/register">
        <button className={styles.uploadbutton} >UPLOAD FILE</button> 
          {/* onClick={handleUpload} */}
        </Link>
      </div>
    </div>
  );
};

export default Home;