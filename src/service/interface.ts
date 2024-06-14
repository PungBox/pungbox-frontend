export interface GetUploadUrlsRequest {
  files: {
    fileName: string;
    size: number;
  }[];
  bucketId: string;
}

interface GetUploadUrlsResponse {
  id: string;
  fileName: string;
  urls: string[];
  uploadId: number;
}

interface ViewBucketResponse {
  id: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
  merged: boolean;
  deleted: boolean;
  type: string;
}

interface CreateBucketResponse {
  id: string;
}

interface AuthenticateRequest {
  bucketId: string;
  password: string;
}

interface AuthenticateResponse {
  statusCode: number;
  accessToken: string;
}

export type {
  GetUploadUrlsResponse,
  ViewBucketResponse,
  CreateBucketResponse,
  AuthenticateRequest,
  AuthenticateResponse,
};
