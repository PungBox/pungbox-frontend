import styles from '/src/components/Module/View.module.css';

export const LoadingFileList = () => {
  return (
    <tr>
      <td colSpan={6} className={styles.loadingCell}>
        <div className={styles.loader}></div>
        <span>Loading...</span>
      </td>
    </tr>
  );
};
