import { uploadConfig } from '../utils/config';
import { isEmpty } from 'lodash';

const generateEndpoint = ({
  endpoint,
  params = {},
}: {
  endpoint: string;
  params?: Record<string, string | number>;
}) => {
  return `${import.meta.env.VITE_PROD_ENDPOINT}${endpoint}${
    !isEmpty(params)
      ? `?${Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&')}`
      : ''
  }`;
};

export interface GetBucketInfoResponse {
  bucketId: string;
  bucketName: string;
  bucketCode: string;
  expired?: boolean;
  expiredAt: string;
}

export const getBucketInfo = async (bucketId: string): Promise<GetBucketInfoResponse> => {
  const endpoint = generateEndpoint({ endpoint: '/bucket/info', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return JSON.parse(data.body);
};

interface GetUploadUrlsResponse {
  id: string;
  fileName: string;
  urls: string[];
  uploadId: number;
}

export const getUploadUrls = async ({
  files,
  bucketId,
}: {
  files: {
    fileName: string;
    size: number;
  }[];
  bucketId: string;
}): Promise<GetUploadUrlsResponse[]> => {
  const endpoint = generateEndpoint({ endpoint: '/file/get-upload-url', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(JSON.stringify({ files })),
  });
  const data = await response.json();
  return JSON.parse(data.body);
};

export const getDownloadUrls = async (fileIds: string[]): Promise<Record<string, string>> => {
  const endpoint = generateEndpoint({ endpoint: '/file/get-download-url' });
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

interface ViewBucketResponse {
  id: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
  merged: boolean;
  deleted: boolean;
  type: string;
}

export const viewBucket = async ({ bucketId }: { bucketId: string }): Promise<{ files: ViewBucketResponse[] }> => {
  const endpoint = generateEndpoint({ endpoint: '/bucket/view', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return JSON.parse(data.body);
};

interface CreateBucketResponse {
  id: string;
}

export const createBucket = async (password: string): Promise<CreateBucketResponse> => {
  const endpoint = generateEndpoint({ endpoint: '/bucket/create' });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password }),
  });
  const data = await response.json();
  return JSON.parse(data.body);
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

export type { ViewBucketResponse, GetUploadUrlsResponse };
