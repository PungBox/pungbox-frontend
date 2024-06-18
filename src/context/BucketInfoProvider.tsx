import React, { createContext, useContext, useState } from 'react';

type BucketInfoType = {
  bucketId: string;
  bucketCode: string;
  expiredAt?: string;
};

export const BucketInfoContext = createContext<{
  bucketInfo: BucketInfoType;
  setBucketInfo: (bucketInfo: BucketInfoType) => void;
}>({
  bucketInfo: {
    bucketId: '',
    bucketCode: '',
    expiredAt: '',
  },
  setBucketInfo: (bucketInfo: BucketInfoType) => Promise.resolve(bucketInfo),
});

export const useBucketInfoContext = () => useContext(BucketInfoContext);

const BucketInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [bucketInfo, setBucketInfo] = useState<BucketInfoType>({
    bucketId: '',
    bucketCode: '',
    expiredAt: '',
  });

  return <BucketInfoContext.Provider value={{ bucketInfo, setBucketInfo }}>{children}</BucketInfoContext.Provider>;
};

export default BucketInfoProvider;
