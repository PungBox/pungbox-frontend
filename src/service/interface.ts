export interface PostUploadUrlsRequest {
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
  uploadId: string;
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
  uploadId: string;
}

export interface UploadFileResponse {
  ETag: string | undefined;
  PartNumber: number;
}
[];

export interface GetBucketInfoResponse {
  bucketId: string;
  bucketName: string;
  expired: boolean;
  expiredAt: string;
}

export interface AuthenticateRequest {
  bucketCode: string;
  password: string;
}

export interface AuthenticateResponse {
  bucketId: string;
  statusCode: number;
  accessToken: string;
}
