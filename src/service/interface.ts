export interface GetUploadUrlsRequest {
  files: {
    fileName: string;
    size: number;
  }[];
  bucketId: string;
}

export interface GetUploadUrlsResponse {
  id: string;
  fileName: string;
  urls: string[];
  uploadId: number;
}

export interface GetDownloadUrlRequest {
  fileIds: string[];
}

export type GetDownloadUrlResponse = Record<string, string>;

export interface ViewBucketRequest {
  bucketId: string;
}

export interface ViewBucketResponse {
  id: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
  merged: boolean;
  deleted: boolean;
  type: string;
}

export interface CreateBucketRequest {
  password: string;
  durationMin: string;
}

export interface CreateBucketResponse {
  id: string;
  expiredAt: string;
}

export interface DeleteFilesRequest {
  bucketId: string;
  fileIds: string[];
}

export interface DeleteFilesResponse {
  success: boolean;
}

export interface UploadFileRequest {
  file: File;
  urls: string[];
  bucketId: string;
  uploadId: number;
}

export interface UploadFileResponse {
  success: boolean;
}

export interface GetBucketInfoResponse {
  bucketId: string;
  bucketName: string;
  expired: boolean;
  expiredAt: string;
}

export interface AuthenticateRequest {
  bucketId: string;
  password: string;
}

export interface AuthenticateResponse {
  statusCode: number;
  accessToken: string;
}
