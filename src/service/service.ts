export const getPresignedUrl = async ({files, bucketName, threshold = 1024}: {files: {
  filename: string, size: number}[]; bucketName: string; threshold?: number }) => {
  const response = await fetch(
    `https://mam3pz37pe.execute-api.us-east-1.amazonaws.com/pungbox-api-prod/bucket/url?bucketName=${bucketName}&threshold=${threshold}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ files }),
    }
  );
  const data = await response.json();
  return data.url;
}