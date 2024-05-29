interface FileDescription {
  id: string;
  fileName: string;
  fileSize: number;
  merged: boolean;
  deleted: boolean;
  createdAt: string;
}

export type { FileDescription };
