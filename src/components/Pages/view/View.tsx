import React, { useEffect } from 'react';
import { fetchFileDescriptions } from '../../../utils/dummyData';
import { FileListTableHeader } from './component/FileListTableHeader';
import { FileListTableBody } from './component/FileListTableBody';
import { fileListConfig } from '../../../utils/config';
import { useSortingOrder } from './util/view/sortingOrder';
import { useFileDescription } from './util/view/fileDescription';
import styles from '/src/components/Module/View.module.css';
import { useSelected } from './util/view/selected';

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
    deleteFile,
  } = useFileDescription();
  const {
    selected, toggleSelectFile,
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
  return (
    <div className={styles.view_panel}>
      <div className={styles.view_panel_header}>
        <p className={styles.storage_number}>Storage No. {storageNumber}</p>
        <p className={styles.expiration_date}>expiration date: {expirationDate}</p>
      </div>
      <table className={styles.file_list_table}>
        <thead>
        <FileListTableHeader
          handleSorting={handleSorting}
          sortingCriteria={sortingCriteria}
          isSortingAscending={isSortingAscending}
          fileDescriptions={fileDescriptions}
          selected={selected}
          deleteFile={deleteFile}
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
            <input type="file" onChange={addFile} />
          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default View;
