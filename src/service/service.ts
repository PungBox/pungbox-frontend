import { uploadConfig } from '../utils/config';
import {
  AuthenticateRequest,
  AuthenticateResponse,
  CreateBucketResponse,
  GetUploadUrlsRequest,
  GetUploadUrlsResponse,
  ViewBucketResponse,
} from './interface';
import { fetchFetch, generateEndpoint } from './util';
import { NotFoundException, UnauthorizedException } from './exception';

export const getUploadUrls = async ({ files, bucketId }: GetUploadUrlsRequest): Promise<GetUploadUrlsResponse[]> => {
  return await fetchFetch({
    endpoint: '/file/get-upload-url', params: { bucketId }, fetchInit: {
      method: 'GET',
      body: { files },
    },
  });
};

interface GetDownloadUrlRequest {
  fileIds: string[];
}

export const getDownloadUrls = async ({ fileIds }: GetDownloadUrlRequest): Promise<Record<string, string>> => {
  return await fetchFetch({
    endpoint: '/file/get-download-url', fetchInit: {
      method: 'GET',
      body: { fileIds },
    },
  });
};

export const viewBucket = async ({ bucketId }: { bucketId: string }): Promise<{ files: ViewBucketResponse[] }> => {
  const endpoint = generateEndpoint({ endpoint: '/bucket/view', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Access-Token': window.localStorage.getItem('accessToken') || '',
    },
  });
  const data = await response.json();
  if (data.statusCode === 401 /*unauthorized*/) {
    throw new UnauthorizedException();
  } else if (data.statusCode === 404) {
    throw new NotFoundException();
  }
  return JSON.parse(data.body);
};

export const createBucket = async (password: string): Promise<CreateBucketResponse> => {
  return await fetchFetch({
    endpoint: '/bucket/create', fetchInit: {
      body: { password },
    },
  });
};

export const deleteFiles = async (bucketId: string, fileIds: string[]): Promise<{ success: boolean }> => {
  const endpoint = generateEndpoint({ endpoint: '/file/delete', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileIds }),
  });
  const data = await response.json();
  return JSON.parse(data.body);
};

export const uploadFile = async (
  file: File,
  urls: string[],
  bucketId: string,
  uploadId: number,
): Promise<
  Promise<{
    success: boolean;
  }>[]
> => {
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

export const getBucketInfo = async () => {
  return { bucketId: 'string', bucketName: 'string', expired: false, expiration: 'string' };
};

export const authenticate = async ({ bucketId, password }: AuthenticateRequest)
  : Promise<AuthenticateResponse | null> => {
  const endpoint = generateEndpoint({ endpoint: '/authenticate' });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: bucketId,
      password: password,
    }),
  });
  const data = await response.json();
  if (data.statusCode !== 200) {
    console.error(`Authentication failed. HTTP response status code=${data.statusCode}`);
    return null;
  }
  window.localStorage.setItem('accessToken', data.accessToken);
  return data;
};

export const signout = async () => {
  window.localStorage.setItem('accessToken', '');
};
