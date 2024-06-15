import { useEffect, useMemo } from 'react';
import { FileListTableHeader } from './component/FileListTableHeader';
import { FileListTableBody } from './component/FileListTableBody';
import Expired from './component/Expired';
import styles from '/src/components/Module/View.module.css';
import { useBucketInfo, useDownloadFiles, useFileDescription, useSelectedFiles, useSortingOrder } from './hooks';
import { useSearchParams } from 'react-router-dom';

const View = () => {
  const [searchParams] = useSearchParams();
  const bucketCode = searchParams.get('bucketCode');
  console.log(bucketCode);
  const { sortingCriteria, isSortingAscending, resetToDefaultSortingOrder, handleSorting, reSortFileDescriptions } =
    useSortingOrder();
  const { isLoading: isLoadingBucketInfo, bucketInfo, timeToExpire } = useBucketInfo(bucketCode);
  const {
    fetchFiles,
    isLoading: isLoadingFiles,
    fileDescriptions,
    setFileDescriptions,
    uploadFiles,
    deleteFiles,
  } = useFileDescription(bucketCode);

  const isLoading = useMemo(() => isLoadingBucketInfo || isLoadingFiles, [isLoadingBucketInfo, isLoadingFiles]);

  const { selected, getSelectedFileIds, toggleSelectFile } = useSelectedFiles(fileDescriptions);

  const { downloadFiles, isDownloading } = useDownloadFiles();

  useEffect(() => {
    reSortFileDescriptions(fileDescriptions, setFileDescriptions);
  }, [reSortFileDescriptions]);

  return (
    <div className={styles.view_panel}>
      <div className={styles.view_panel_header}>
        <p className={styles.storage_number}>Storage No. {bucketInfo?.bucketId}</p>
        <p className={styles.expiration_date}>expiration date: {bucketInfo.expiration}</p>
        {!bucketInfo?.expired && (
          <p className={styles.expiration_date}>
            {timeToExpire.days} Days {timeToExpire.hours}h:{timeToExpire.minutes}m: {timeToExpire.seconds}s to expire
          </p>
        )}
      </div>
      {bucketInfo?.expired ? (
        <Expired />
      ) : (
        <>
          <div className={styles.button_container}>
            <button
              className={styles.download_button}
              onClick={() => downloadFiles(getSelectedFileIds())}
              disabled={isLoading}
            >
              <span className="material-symbols-outlined">Download</span>
            </button>
            <button
              className={styles.delete_button}
              onClick={() => deleteFiles(getSelectedFileIds())}
              disabled={isLoading}
            >
              <span className="material-symbols-outlined">Delete</span>
            </button>
            <button className={styles.refresh_button} onClick={fetchFiles} disabled={isLoading}>
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
                isLoading={isLoadingFiles}
                selected={selected}
                toggleSelectFile={toggleSelectFile}
              />
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6}>
                  <label htmlFor="file_upload" className={styles.file_upload_label}>
                    <input
                      type="file"
                      id="file_upload"
                      className={styles.file_upload_input}
                      onChange={async (e) => await uploadFiles(e.target.files)}
                    />
                    Upload File
                  </label>
                </td>
              </tr>
            </tfoot>
          </table>
        </>
      )}
    </div>
  );
};

export default View;
