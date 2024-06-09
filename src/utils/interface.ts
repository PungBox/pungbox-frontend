interface FileDescription {
  id: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
  modifiedAt: string | null;
  merged: boolean;
  deleted: boolean;
  type: string;
}

export type { FileDescription };
