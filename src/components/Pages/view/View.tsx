import { useEffect, useMemo } from 'react';
import { FileListTableHeader } from './component/FileListTableHeader';
import { FileListTableBody } from './component/FileListTableBody';
import Expired from './component/Expired';
import styles from '/src/components/Module/View.module.css';
import { useBucketInfo, useDownloadFiles, useFileDescription, useSelectedFiles, useSortingOrder } from './hooks';
import { isAuthenticated } from '../../../service/service';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useUpadteFiles from './hooks/useUploadFiles';

const View = () => {
  const [searchParams] = useSearchParams();
  const bucketCode = searchParams.get('bucketCode') || '';
  const { sortingCriteria, isSortingAscending, resetToDefaultSortingOrder, handleSorting, reSortFileDescriptions } =
    useSortingOrder();

  const { isLoading: isLoadingBucketInfo, bucketInfo, timeToExpire } = useBucketInfo(bucketCode);

  const { isUploading, hasError, uploadFiles } = useUpadteFiles(bucketInfo.bucketId);
  const {
    fetchFiles,
    isLoading: isLoadingFiles,
    fileDescriptions,
    setFileDescriptions,
    deleteFiles,
  } = useFileDescription(bucketInfo.bucketId);
  const navigate = useNavigate();
  
  const isLoading = useMemo(() => isLoadingBucketInfo || isLoadingFiles, [isLoadingBucketInfo, isLoadingFiles]);
  
  const { selected, getSelectedFileIds, toggleSelectFile } = useSelectedFiles(fileDescriptions);
  
  const { downloadFiles, isDownloading } = useDownloadFiles();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      window.alert('You don\'t have access to this storage. Please enter your access code and password.');
      navigate('/authenticate');
    }
  }, []);
  
  useEffect(() => {
    reSortFileDescriptions(fileDescriptions, setFileDescriptions);
  }, [reSortFileDescriptions]);
  
  return (
    <div className={styles.view_panel}>
      <div className={styles.view_panel_header}>
        <p className={styles.storage_number}>Storage No. {bucketInfo?.bucketCode}</p>
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
                      disabled={isLoading || isUploading}
                      onChange={async (e) => await uploadFiles(e.target.files)}
                    />
                    {hasError ? 'Error Occured while uploading files' : isUploading ? 'Uploading ...' : 'Upload File'}
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
