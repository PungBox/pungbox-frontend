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
    displayName: 'name',
    sortable: true,
    ascending: true,
  },
  {
    name: 'size',
    displayName: 'size',
    sortable: true,
    ascending: false,
  },
  {
    name: 'date',
    displayName: 'upload date',
    sortable: true,
    ascending: false,
  },
];

const mappings: { [key: string]: 'fileName' | 'fileSize' | 'created' } = {
  name: 'fileName',
  size: 'fileSize',
  date: 'created',
};

const fileListConfig = {
  headers,
  defaultSortingCriteria,
  mappings,
};

const authConfig = {
  DIGIT_LENGTH: 6,
};


export type { HeaderConfig };
export { fileListConfig, authConfig };
