import { uploadConfig } from '../utils/config';
import {
  AuthenticateRequest,
  AuthenticateResponse,
  CreateBucketResponse,
  GetUploadUrlsResponse,
  ViewBucketResponse,
} from './interface';
import { fetchWithoutAuth, generateEndpoint } from './util';
import { NotFoundException, UnauthorizedException } from './exception';


export const getUploadUrls = async ({ files, bucketId }: {
  files: {
    fileName: string;
    size: number;
  }[];
  bucketId: string;
}): Promise<GetUploadUrlsResponse[]> => {
  const endpoint = generateEndpoint({ endpoint: '/file/get-upload-url', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'GET',
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
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileIds }),
  });
  const data = await response.json();
  return JSON.parse(data.body);
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

// export const createBucket = async (password: string): Promise<CreateBucketResponse> => {
//   const endpoint = generateEndpoint({ endpoint: '/bucket/create' });
//   const response = await fetch(endpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ password }),
//   });
//   return await response.json();
// };

export const createBucket = async (password: string): Promise<CreateBucketResponse> => {
  return await fetchWithoutAuth({
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
