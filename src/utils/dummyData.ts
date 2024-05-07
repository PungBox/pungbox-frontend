import { FileDescription } from './interface';

const fileDescriptions: FileDescription[] = [
  {
    fileId: 1,
    fileName: 'file1.pdf',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: 1376,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  {
    fileId: 2,
    fileName: 'document1.docx',
    fileUrl: 'https://calibre-ebook.com/downloads/demos/demo.docx',
    fileSize: 35642,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  {
    fileId: 3,
    fileName: 'zipfile.zip',
    fileUrl: 'https://getsamplefiles.com/download/zip/sample-1.zip',
    fileSize: 434632,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  {
    fileId: 4,
    fileName: 'picture.png',
    fileUrl: 'https://download.samplelib.com/png/sample-boat-400x300.png',
    fileSize: 12483,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
  {
    fileId: 5,
    fileName: 'movie.mp4',
    fileUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    fileSize: 8452321,
    created: new Date().toISOString(),
    modified: new Date().toISOString(),
  },
];

export { fileDescriptions };