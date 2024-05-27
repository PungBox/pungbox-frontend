const generateEndpoint = ({
  endpoint,
  params = {},
}: {
  endpoint: string;
  params?: Record<string, string | number>;
}) => {
  return `${import.meta.env.REACT_APP_PROD_ENDPOINT}${endpoint}${
    params
      ? `?${Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&')}`
      : ''
  }`;
};

export const getUploadUrls = async ({
  files,
  bucketName,
}: {
  files: {
    fileName: string;
    fileSize: number;
  }[];
  bucketName: string;
}) => {
  const response = await fetch(generateEndpoint({ endpoint: '/file/get-upload-url', params: { bucketName } }), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ files }),
  });
  const data = await response.json();
  return data;
};

export const getDownloadUrls = async (fileIds: string[]) => {
  const response = await fetch(generateEndpoint({ endpoint: '/file/get-upload-url' }), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileIds }),
  });
  const data = await response.json();
  return data;
};

export const viewBucket = async ({ bucketId }: { bucketId: string }) => {
  const response = await fetch(generateEndpoint({ endpoint: '/bucket/view', params: { bucketId } }), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.files;
};

export const createBucket = async ({ bucketName, password }: { bucketName: string; password: string }) => {
  const response = await fetch(generateEndpoint({ endpoint: '/bucket/create' }), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bucketName, password }),
  });
  const data = await response.json();
  return data;
};

export const deleteFiles = async (fileIds: string[]) => {
  const response = await fetch(generateEndpoint({ endpoint: '/file/delete' }), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileIds }),
  });
  const data = await response.json();
  return data;
};
