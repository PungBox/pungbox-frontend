import Layout from 'components/Layout/Layout'
import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect
} from "react";
import styles from '/src/components/Module/Home.module.css'; 
import iconExpand from '/src/assets/icon/icon_expand.svg';
import iconCollapse from '/src/assets/icon/icon_collapse.svg';

interface IFileTypes {
  id: number;
  object: File;
}

const Home = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<IFileTypes[]>([]);
  const [showFiles, setShowFiles] = useState<boolean>(false);

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileId = useRef<number>(0);

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: IFileTypes[] = files;

      if (e.type === "drop") {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file
          }
        ];
      }

      setFiles(tempFiles);
    },
    [files]
  );

  const handleFilterFile = useCallback(
    (id: number): void => {
      setFiles(files.filter((file: IFileTypes) => file.id !== id));
    },
    [files]
  );

  const handleDragStart = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      onChangeFiles(e);
    },
    [onChangeFiles]
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter", handleDragStart);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("dragleave", handleDragEnd);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [handleDragStart, handleDragOver, handleDragEnd, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter", handleDragStart);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("dragleave", handleDragEnd);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [handleDragStart, handleDragOver, handleDragEnd, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  const toggleFilesVisibility = () => {
    setShowFiles(!showFiles);
  };

  
  return (
    <div className={styles.outercontainer}>
      <div className={styles.innercontainer}>
        {/* 드래그 앤 드롭 영역 */}
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          multiple={true}
          onChange={onChangeFiles}
        />
        <label
          className={`${styles.dropzone} ${isDragging ? 'active' : ''}`}
          htmlFor="fileUpload"
          ref={dragRef}
        >
          <img className={styles.uploadicon} src="src/assets/icon/free-icon-cloud-database-7734276.png" />
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
        <button className={styles.uploadbutton} >UPLOAD FILE</button> 
        {/* onClick={handleUpload} */}
      </div>
    </div>
  );
}
export default Home