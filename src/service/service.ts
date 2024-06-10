const generateEndpoint = ({
  endpoint,
  params = {},
}: {
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

export const getUploadUrls = async ({
  files,
  bucketId,
}: {
  files: {
    fileName: string;
    size: number;
  }[];
  bucketId: string;
}): Promise<
  {
    fileName: string;
    urls: string[];
    uploadId: number;
  }[]
> => {
  const endpoint = generateEndpoint({ endpoint: '/file/get-upload-url', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ files }),
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

export const getBucketInfo = async (): Promise<{
  bucketId: string;
  bucketName: string;
  expired: boolean;
  expiration: string;
}> => {
  const endpoint = generateEndpoint({ endpoint: '/bucket/get-info' });
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return JSON.parse(data.body);
};

export const viewBucket = async ({
  bucketId,
}: {
  bucketId: string;
}): Promise<{
  files: {
    id: string;
    fileName: string;
    fileSize: number;
    createdAt: string;
    merged: boolean;
    deleted: boolean;
  }[];
}> => {
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

export const createBucket = async ({
  bucketName,
  password,
}: {
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
