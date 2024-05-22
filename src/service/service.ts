//@TODO: endpoint 는 env 환경변수로 관리하도록 수정
const DEFAULT_ENDPOINT = 'https://nmxnc3h7a8.execute-api.ap-northeast-2.amazonaws.com/production';

const generateEndpoint = ({
  endpoint,
  params = {},
}: {
  endpoint: string;
  params?: Record<string, string | number>;
}) => {
  return `${DEFAULT_ENDPOINT}${endpoint}${
    params
      ? `?${Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join('&')}`
      : ''
  }`;
};

export const getPresignedUrl = async ({
  files,
  bucketName,
  threshold = 1024,
}: {
  files: File[];
  bucketName: string;
  threshold?: number;
}) => {
  const response = await fetch(
    generateEndpoint({ endpoint: '/bucket/presigned-url', params: { bucketName, threshold } }),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ files }),
    },
  );
  const data = await response.json();
  return data.url;
};

export const getFilesFromBucket = async ({ bucketId }: { bucketId: string }) => {
  const response = await fetch(generateEndpoint({ endpoint: '/bucket/files', params: { bucketId } }), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  return data.files;
};
