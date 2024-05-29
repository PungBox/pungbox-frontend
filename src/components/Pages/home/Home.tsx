import React, {
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from 'react';
import useDragAndDrop from '../../../utils/component/UseDragDrop';
import styles from '/src/components/Module/Home.module.css'; 
import iconExpand from '/src/assets/images/icon_expand.svg';
import iconCollapse from '/src/assets/images/icon_collapse.svg';
import { Link, useNavigate } from 'react-router-dom';
import uploadUrl from '/src/assets/images/icon-cloud-database.png';

interface IFileTypes {
  id: number;
  object: File;
}

const Home = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<IFileTypes[]>([]);
  const [showFiles, setShowFiles] = useState<boolean>(false);

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

  const nextFileId = useRef<number>(0);

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
    setFiles(tempFiles);
  };

  const handleFilterFile = (id: number) => {
    setFiles(files.filter((file: IFileTypes) => file.id !== id));
  };

  const toggleFilesVisibility = () => {
    setShowFiles(!showFiles);
  };

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (files.length > 0) {
      navigate('/register', { state: { files } }); // 파일이 있으면 "/register"로 이동
      //files는 /register로 이동할 때 state라는 속성에 포함되어 전달됨!
    } else {
      alert('Please upload at least one file.'); // 파일이 없으면 경고창 표시
    }
  };

  const { dragRef } = useDragAndDrop(handleDragStart, handleDragOver, handleDragEnd, handleDrop);
  
  return (
    <div className={styles.outercontainer}>
      <div className={styles.innercontainer}>
        {/* 드래그 앤 드롭 영역 */}
        <input type="file" id="fileUpload" style={{ display: 'none' }} multiple={true} onChange={onChangeFiles} />
        <label className={`${styles.dropzone} ${isDragging ? 'active' : ''}`} htmlFor="fileUpload" ref={dragRef}>
          <img className={styles.uploadicon} src={uploadUrl} />
          <span>Click or Drop files here to upload</span>
        </label>

        <button className={styles.filelistbutton} onClick={toggleFilesVisibility}>
          {showFiles ? <img src={iconCollapse} alt="Collapse" /> : <img src={iconExpand} alt="Expand" />}
          <span>All uploads</span>
        </button>
        <div className={styles.dragdropFiles} style={{ display: showFiles ? 'block' : 'none' }}>
          {files.map((file: IFileTypes) => {
            const {
              id,
              object: { name },
            } = file;

            return (
              <div key={id}>
                <div>{name}</div>
                <div className={styles.dragdropFilesFilter} onClick={() => handleFilterFile(id)}>
                  <span>X</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
     
      <div style={{ textAlign: 'center' }}>
        <button className={styles.uploadbutton} onClick={handleUpload}>
          <span>UPLOAD FILE</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
