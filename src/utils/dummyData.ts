import { FileDescription } from './interface';

const fileDescriptions: FileDescription[] = [
  {
    fileId: 1,
    fileName: 'file1',
    file: '',
    fileSize: 1376,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  {
    fileId: 2,
    fileName: 'document1.docx',
    file: '',
    fileSize: 35642,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  {
    fileId: 3,
    fileName: 'zipfile.zip',
    file: '',
    fileSize: 434632,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  {
    fileId: 4,
    fileName: 'picture.png',
    file: '',
    fileSize: 12483,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  {
    fileId: 5,
    fileName: 'movie.mov',
    file: '',
    fileSize: 8452321,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
];

export { fileDescriptions };