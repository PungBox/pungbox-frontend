import React, { useEffect } from 'react';
import { fetchFileDescriptions } from '../../../utils/dummyData';
import { FileListTableHeader } from './component/FileListTableHeader';
import { FileListTableBody } from './component/FileListTableBody';
import { fileListConfig } from '../../../utils/config';
import { useSortingOrder } from './util/view/sortingOrder';
import { useFileDescription } from './util/view/fileDescription';
import styles from '/src/components/Module/View.module.css';
import { useSelected } from './util/view/selected';
import { downloadFiles } from './util/view/view';

const View = () => {
  const storageNumber = 192837;
  const expirationDate = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  const { sortingCriteria, isSortingAscending, resetToDefaultSortingOrder, handleSorting, reSortFileDescriptions } =
    useSortingOrder();
  const {
    fileDescriptions,
    setFileDescriptions,
    isFileDescriptionsLoaded,
    displayFileDescriptions,
    addFile,
    deleteFiles,
  } = useFileDescription();
  const {
    selected, getSelectedFileIds, getSelectedFileUrls, toggleSelectFile,
  } = useSelected(fileDescriptions);
  
  useEffect(() => {
    fetchFileDescriptions().then((fileDescriptions) => {
      displayFileDescriptions(fileDescriptions);
      resetToDefaultSortingOrder(fileListConfig.defaultSortingCriteria);
    });
  }, []);
  
  useEffect(() => {
    reSortFileDescriptions(fileDescriptions, setFileDescriptions);
  }, [reSortFileDescriptions]);
  
  
  // TODO: dummy json 사용 중이지만, backend로부터 가져오도록 변경해야 함
  // TODO 추가: 인증키 유효하지 않으면 Expired 페이지로 이동하게 (만료일자 및 고유번호 포함)
  return (
    <div className={styles.view_panel}>
      <div className={styles.view_panel_header}>
        <p className={styles.storage_number}>Storage No. {storageNumber}</p>
        <p className={styles.expiration_date}>expiration date: {expirationDate}</p>
      </div>
      <div className={styles.button_container}>
        <button className={styles.download_button} onClick={() => downloadFiles(getSelectedFileUrls(fileDescriptions))}>
          <span className="material-symbols-outlined">Download</span>
        </button>
        <button className={styles.delete_button} onClick={() => deleteFiles(getSelectedFileIds())}>
          <span className="material-symbols-outlined">Delete</span>
        </button>
      </div>
      <table className={styles.file_list_table}>
        <thead>
        <FileListTableHeader
          handleSorting={handleSorting}
          sortingCriteria={sortingCriteria}
          isSortingAscending={isSortingAscending}
        />
        </thead>
        <tbody>
        <FileListTableBody
          fileDescriptions={fileDescriptions}
          isFileDescriptionsLoaded={isFileDescriptionsLoaded}
          selected={selected}
          toggleSelectFile={toggleSelectFile}
        />
        </tbody>
        <tfoot>
        <tr>
          <td colSpan={6}>
            <label htmlFor="file_upload" className={styles.file_upload_label}>
              <input type="file" id="file_upload" className={styles.file_upload_input} onChange={addFile} />
                Upload File
            </label>
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default View;
