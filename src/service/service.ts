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
  PostUploadUrlsRequest,
  GetUploadUrlsResponse,
  UploadFileRequest,
  UploadFileResponse,
  ViewBucketRequest,
  ViewBucketResponse,
} from './interface';
import { fetchPung, generateEndpoint } from './util';

export const getUploadUrls = async ({ files, bucketId }: PostUploadUrlsRequest): Promise<GetUploadUrlsResponse[]> => {
  const response = await fetchPung({
    endpoint: '/file/get-upload-url',
    params: { bucketId },
    fetchInit: {
      body: { files },
    },
  });

  console.log(response);
  // const data = await response.json();
  return JSON.parse(response.body);
};

export const getDownloadUrls = async ({ fileIds }: GetDownloadUrlRequest): Promise<GetDownloadUrlResponse> => {
  return await fetchPung({
    endpoint: '/file/get-download-url',
    fetchInit: {
      method: 'GET',
      body: { fileIds },
    },
  });
};

export const viewBucket = async ({ bucketId }: ViewBucketRequest): Promise<{ files: ViewBucketResponse[] }> => {
  return await fetchPung({
    endpoint: '/bucket/view',
    params: { bucketId },
    fetchInit: {
      method: 'GET',
    },
  });
};

export const createBucket = async ({ durationMin, password }: CreateBucketRequest): Promise<CreateBucketResponse> => {
  return await fetchPung({
    endpoint: '/bucket/create',
    fetchInit: {
      body: { durationMin, password },
    },
  });
};

export const deleteFiles = async ({ bucketId, fileIds }: DeleteFilesRequest): Promise<DeleteFilesResponse> => {
  return await fetchPung({
    endpoint: '/file/delete',
    params: { bucketId },
    fetchInit: {
      body: { fileIds },
    },
  });
};

export const uploadFile = async ({
  file,
  urls,
  bucketId,
  uploadId,
}: UploadFileRequest): Promise<Promise<UploadFileResponse>[]> => {
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

export const getBucketInfo = async (bucketId: string): Promise<GetBucketInfoResponse> => {
  const endpoint = generateEndpoint({ endpoint: '/bucket/get-info', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return JSON.parse(data.body);
};

export const authenticate = async ({ bucketCode, password }: AuthenticateRequest): Promise<AuthenticateResponse> => {
  const data = await fetchPung({
    endpoint: '/authenticate',
    fetchInit: {
      body: {
        user_id: bucketCode,
        password: password,
      },
    },
  });
  if (Object.hasOwn(data, 'accessToken')) {
    console.log('accessToken', data.accessToken);
    window.localStorage.setItem('accessToken', data.accessToken);
  }
  return data;
};

export const signout = async () => {
  window.localStorage.setItem('accessToken', '');
};
