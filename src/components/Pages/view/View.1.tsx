import React, { useCallback, useEffect, useState } from 'react';
import { fetchFileDescriptions } from '../../../utils/dummyData';
import { FileListTableHeader } from './component/FileListTableHeader';
import { FileListTableBody } from './component/FileListTableBody';
import { fileListConfig } from '../../../utils/config';
import { useSortingOrder } from './util/view/sortingOrder';
import { useFileDescription } from './util/view/fileDescription';
import { useSelected } from './util/view/selected';
import styles from '/src/components/Module/View.module.css';
import { getDownloadUrls, viewBucket } from 'service/service';
import axios from 'axios';
import { DUMMY_BUCKET_ID } from './View';

export const View = () => {
  const storageNumber = 192837;
  const expirationDate = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  const [isLoading, setIsLoading] = useState(false);
  const { sortingCriteria, isSortingAscending, resetToDefaultSortingOrder, handleSorting, reSortFileDescriptions } =
    useSortingOrder();
  const { fileDescriptions, setFileDescriptions, isFileDescriptionsLoaded, displayFileDescriptions, addFile } =
    useFileDescription();
  const { selected, getSelectedFileIds, toggleSelectFile } = useSelected(fileDescriptions);

  useEffect(() => {
    //@TODO: replace DUMMY_BUCKET_ID with actual bucketId
    viewBucket({ bucketId: DUMMY_BUCKET_ID }).then((fileDescriptions) => {
      displayFileDescriptions(fileDescriptions);
      resetToDefaultSortingOrder(fileListConfig.defaultSortingCriteria);
    });
  }, []);

  useEffect(() => {
    reSortFileDescriptions(fileDescriptions, setFileDescriptions);
  }, [reSortFileDescriptions]);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchFileDescriptions().then((fileDescriptions) => {
      displayFileDescriptions(fileDescriptions);
      setIsLoading(false);
    });
  };

  const downloadFiles = useCallback((): void => {
    const fileIds = getSelectedFileIds();

    getDownloadUrls(fileIds).then((downloadUrls) => {
      Object.entries(downloadUrls).forEach(([fileId, url]) => {
        axios
          .get(url, { responseType: 'blob' })
          .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileId);
            document.body.appendChild(link);
            link.click();
            link.remove();
          })
          // @TODO: 에러 핸들링을 개별적으로 처리하도록 하면 좋겠습니다.
          .catch((error) => console.error(`Error downloading file: ${fileId}`, error));
      });
    });
  }, []);

  // TODO 추가: 인증키 유효하지 않으면 Expired 페이지로 이동하게 (만료일자 및 고유번호 포함)
  return (
    <div className={styles.view_panel}>
      <div className={styles.view_panel_header}>
        <p className={styles.storage_number}>Storage No. {storageNumber}</p>
        <p className={styles.expiration_date}>expiration date: {expirationDate}</p>
      </div>
      <div className={styles.button_container}>
        <button className={styles.download_button} onClick={downloadFiles} disabled={isLoading}>
          <span className="material-symbols-outlined">Download</span>
        </button>
        <button className={styles.delete_button} onClick={() => deleteFiles(getSelectedFileIds())} disabled={isLoading}>
          <span className="material-symbols-outlined">Delete</span>
        </button>
        <button className={styles.refresh_button} onClick={handleRefresh} disabled={isLoading}>
          <span className="material-symbols-outlined">
            {isLoading ? <div className={styles.loading_animation}></div> : 'Refresh'}
          </span>
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
