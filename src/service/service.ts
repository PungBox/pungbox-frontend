export const getPresignedUrl = async ({files, bucketName, threshold = 1024}: {files: File[]; bucketName: string; threshold?: number }) => {
  const response = await fetch(
    `https://fhxljaiclxngspozkr55elwaba0ifvek.lambda-url.us-west-2.on.aws/?bucketName=${bucketName}&threshold=${threshold}`,
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