import { uploadConfig } from '../utils/config';
import {
  AuthenticateRequest,
  AuthenticateResponse,
  CreateBucketRequest,
  CreateBucketResponse,
  DeleteFilesRequest,
  DeleteFilesResponse,
  GetBucketInfoResponse,
  GetDownloadUrlRequest,
  GetDownloadUrlResponse,
  GetUploadUrlsRequest,
  GetUploadUrlsResponse,
  UploadFileRequest,
  UploadFileResponse,
  ViewBucketRequest,
  ViewBucketResponse,
} from './interface';
import { fetchPung } from './util';

export const getUploadUrls = async ({ files, bucketId }: GetUploadUrlsRequest): Promise<GetUploadUrlsResponse[]> => {
  return await fetchPung({
    endpoint: '/file/get-upload-url', params: { bucketId }, fetchInit: {
      method: 'GET',
      body: { files },
    },
  });
};

export const getDownloadUrls = async ({ fileIds }: GetDownloadUrlRequest): Promise<GetDownloadUrlResponse> => {
  return await fetchPung({
    endpoint: '/file/get-download-url', fetchInit: {
      method: 'GET',
      body: { fileIds },
    },
  });
};

export const viewBucket = async ({ bucketId }: ViewBucketRequest): Promise<{ files: ViewBucketResponse[] }> => {
  return await fetchPung({
    endpoint: '/bucket/view', params: { bucketId }, fetchInit: {
      method: 'GET',
    },
  });
};

export const createBucket = async ({ password }: CreateBucketRequest): Promise<CreateBucketResponse> => {
  return await fetchPung({
    endpoint: '/bucket/create', fetchInit: {
      body: { password },
    },
  });
};

export const deleteFiles = async ({ bucketId, fileIds }: DeleteFilesRequest): Promise<DeleteFilesResponse> => {
  return await fetchPung({
    endpoint: '/file/delete', params: { bucketId }, fetchInit: {
      body: { fileIds },
    },
  });
};

export const uploadFile = async ({ file, urls, bucketId, uploadId }: UploadFileRequest)
  : Promise<Promise<UploadFileResponse>[]> => {
  const fileChunkCount = Math.ceil(file.size / uploadConfig.FILE_CHUNK_SIZE);
  const fileChunks = [];
  for (let i = 0; i < fileChunkCount; i++) {
    fileChunks.push(
      file.slice(i * uploadConfig.FILE_CHUNK_SIZE, Math.min(file.size + 1, (i + 1) * uploadConfig.FILE_CHUNK_SIZE)),
    );
  }
  const result = [] as Promise<{ success: boolean }>[];
  for (let i = 0; i < fileChunks.length; i++) {
    const fileChunk = fileChunks[i];
    const response = await fetch(urls[i], {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: fileChunk,
    });
    result.push(response.json());
  }
  return result;
};

export const getBucketInfo = async (): Promise<GetBucketInfoResponse> => {
  // return await fetchPung({
  //   endpoint: '/bucket/get-info',
  // });
  return {
    bucketId: 'string',
    bucketName: 'string',
    expired: false,
    expiration: 'string',
  };
};

export const authenticate = async ({ bucketId, password }: AuthenticateRequest): Promise<AuthenticateResponse> => {
  const data = await fetchPung({
    endpoint: '/authenticate', fetchInit: {
      body: {
        user_id: bucketId,
        password: password,
      },
    },
  });
  if (Object.hasOwn(data, 'accessToken')) {
    window.localStorage.setItem('accessToken', data.accessToken);
  }
  return data;
};

export const signout = async () => {
  window.localStorage.setItem('accessToken', '');
};
