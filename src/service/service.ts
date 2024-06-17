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
  const data = await fetchPung({
    endpoint: '/bucket/create',
    fetchInit: {
      body: { durationMin, password },
    },
  });
  if (Object.hasOwn(data, 'accessToken')) {
    window.localStorage.setItem('accessToken', data.accessToken);
  }
  return data;
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

export const uploadFile = async ({ file, urls }: UploadFileRequest): Promise<UploadFileResponse[]> => {
  const fileChunkCount = Math.ceil(file.size / uploadConfig.FILE_CHUNK_SIZE);
  const fileChunks = [];

  // Split the file into chunks
  for (let i = 0; i < fileChunkCount; i++) {
    fileChunks.push(
      file.slice(i * uploadConfig.FILE_CHUNK_SIZE, Math.min(file.size, (i + 1) * uploadConfig.FILE_CHUNK_SIZE)),
    );
  }

  // Perform PUT requests for each chunk concurrently using Promise.all
  const uploadPromises = urls.map(async (url, index) => {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: fileChunks[index],
    });

    if (!response.ok) {
      throw new Error(`Failed to upload chunk ${index + 1}`);
    }

    return response.headers.get('ETag'); // Get ETag from response headers
  });

  try {
    // Wait for all PUT requests to complete
    const etags = await Promise.all(uploadPromises);

    // Build array of parts with ETag and part number
    const parts = etags.map((etag, index) => ({
      ETag: etag?.replace(/"/g, ''), // Remove double quotes from ETag
      PartNumber: index + 1, // Part numbers start from 1
    }));

    return parts;
  } catch (error) {
    console.error('Error occured while uploading:', error);
    throw error; // Propagate the error to the caller
  }
};

export const completeMultipartUpload = async ({
  uploadId,
  fileId,
  bucketId,
  parts,
}: {
  uploadId: string;
  fileId: string;
  bucketId: string;
  parts: { ETag: string | undefined; PartNumber: number }[];
}) => {
  const response = await fetchPung({
    endpoint: '/file/complete-multipart-upload',
    params: { uploadId, fileId, bucketId },
    fetchInit: {
      method: 'POST',
      body: { parts },
    },
  });

  if (!response.ok) {
    throw new Error('Failed to complete multipart upload');
  }

  return response.json();
};

export const getBucketInfo = async (bucketCode: string): Promise<GetBucketInfoResponse> => {
  const endpoint = generateEndpoint({ endpoint: '/bucket/get-info', params: { bucketCode } });
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
    window.localStorage.setItem('accessToken', data.accessToken);
  }
  return data;
};

export const signout = async () => {
  window.localStorage.setItem('accessToken', '');
};
