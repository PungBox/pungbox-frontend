interface HeaderConfig {
  name: string;
  displayName: string;
  sortable: boolean;
  ascending?: boolean;
}

const defaultSortingCriteria = 'date';
const headers: HeaderConfig[] = [
  // `name` field is used for internal logic implementation, so it must be unique
  // however, `displayName` don't need to be unique
  {
    name: 'checkbox',
    displayName: '',
    sortable: false,
  },
  {
    name: 'icon',
    displayName: '',
    sortable: false,
  },
  {
    name: 'name',
    displayName: 'Name',
    sortable: true,
    ascending: true,
  },
  {
    name: 'size',
    displayName: 'Size',
    sortable: true,
    ascending: false,
  },
  {
    name: 'date',
    displayName: 'Uploaded Date',
    sortable: true,
    ascending: false,
  },
  {
    name: 'merged',
    displayName: 'Available?',
    sortable: false,
    ascending: false,
  },
];

const mappings: { [key: string]: 'fileName' | 'fileSize' | 'createdAt' } = {
  name: 'fileName',
  size: 'fileSize',
  date: 'createdAt',
};

const fileListConfig = {
  headers,
  defaultSortingCriteria,
  mappings,
};

const authConfig = {
  DIGIT_LENGTH: 6,
};

const uploadConfig = {
  FILE_CHUNK_SIZE: 500000, // in bytes
};

export type { HeaderConfig };
export { fileListConfig, authConfig, uploadConfig };
