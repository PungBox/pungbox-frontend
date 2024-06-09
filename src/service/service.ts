import { uploadConfig } from '../utils/config';

const generateEndpoint = ({ endpoint, params = {} }: {
  endpoint: string;
  params?: Record<string, string | number>;
}) => {
  return `${import.meta.env.VITE_PROD_ENDPOINT}${endpoint}${
    params
      ? `?${Object.keys(params)
        .map((key) => `${key}=${params[key]}`)
        .join('&')}`
      : ''
  }`;
};

interface GetUploadUrlsResponse {
  id: {
    fileName: string;
    urls: string[];
    uploadId: number;
  };
}

export const getUploadUrls = async ({ files, bucketId }: {
  files: {
    fileName: string;
    fileSize: number;
  }[];
  bucketId: string;
}): Promise<GetUploadUrlsResponse> => {
  const endpoint = generateEndpoint({ endpoint: '/file/get-upload-url', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(JSON.stringify({ files })),
  });
  return await response.json();
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
  return await response.json();
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

export const viewBucket = async ({ bucketId }: {
  bucketId: string;
}): Promise<{ files: ViewBucketResponse[] }> => {
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

export const createBucket = async ({ bucketName, password }: {
  bucketName: string;
  password: string;
}): Promise<{ bucketId: string }> => {
  const endpoint = generateEndpoint({ endpoint: '/bucket/create' });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bucketName, password }),
  });
  return await response.json();
};

export const deleteFiles = async (fileIds: string[]): Promise<{ success: boolean }> => {
  const endpoint = generateEndpoint({ endpoint: '/file/delete' });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileIds }),
  });
  return await response.json();
};

export const uploadFile = async (file: File, urls: string[], bucketId: string, uploadId: number): Promise<Promise<{
  success: boolean
}>[]> => {
  const fileChunkCount = Math.ceil(file.size / uploadConfig.FILE_CHUNK_SIZE);
  const fileChunks = [];
  for (let i = 0; i < fileChunkCount; i++) {
    fileChunks.push(file.slice(i * uploadConfig.FILE_CHUNK_SIZE, Math.min(file.size + 1, (i + 1) * uploadConfig.FILE_CHUNK_SIZE)));
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