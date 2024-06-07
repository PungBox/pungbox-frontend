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
    fileSize: number;
  }[];
  bucketId: string;
}): Promise<Record<string, string>> => {
  const endpoint = generateEndpoint({ endpoint: '/file/get-upload-url', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ files }),
  });
  const data = await response.json();
  return data;
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
  return data;
};

export const viewBucket = async ({
  bucketId,
}: {
  bucketId: string;
}): Promise<
  {
    files: {
      id: string;
      fileName: string;
      fileSize: number;
      createdAt: string;
      merged: boolean;
      deleted: boolean;
    }[];
  }
> => {
  const endpoint = generateEndpoint({ endpoint: '/bucket/view', params: { bucketId } });
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.files;
};

export const createBucket = async ({
  bucketName,
  password,
}: {
  bucketName: string;
  password: string;
}): Promise<{ bucketId: string }> => {
  const endpoint = generateEndpoint({ endpoint: '/bucket/create' })
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bucketName, password }),
  });
  const data = await response.json();
  return data;
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
  const data = await response.json();
  return data;
};
