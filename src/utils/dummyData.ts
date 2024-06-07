import { FileDescription } from './interface';

const fileDescriptions: FileDescription[] = [
  {
    id: '1',
    fileName: 'file1.pdf',
    fileSize: 1376,
    createdAt: '2024-05-07T09:14:59.294Z',
    merged: true,
    deleted: false,
  },
  {
    id: '2',
    fileName: 'document1.docx',
    fileSize: 35642,
    createdAt: '2024-05-06T05:44:23.482Z',
    merged: true,
    deleted: false,
  },
  {
    id: '3',
    fileName: 'zipfile.zip',
    fileSize: 434632,
    createdAt: '2024-05-07T17:18:56.547Z',
    merged: true,
    deleted: false,
  },
  {
    id: '4',
    fileName: 'picture.png',
    fileSize: 12483,
    createdAt: '2024-05-07T20:36:53.972Z',
    merged: true,
    deleted: false,
  },
  {
    id: '5',
    fileName: 'movie.mp4',
    fileSize: 8452321,
    createdAt: '2024-05-07T12:35:24.833Z',
    merged: true,
    deleted: false,
  },
  {
    id: '6',
    fileName: 'presentation.pptx',
    fileSize: 294829,
    createdAt: '2024-05-07T14:24:47.243Z',
    merged: true,
    deleted: false,
  },
  {
    id: '7',
    fileName: 'index.json',
    fileSize: 432,
    createdAt: '2024-05-07T05:04:24.523Z',
    merged: true,
    deleted: false,
  },
];

function fetchFileDescriptions(): Promise<FileDescription[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fileDescriptions);
    }, 1000);
  });
}

export { fetchFileDescriptions };
