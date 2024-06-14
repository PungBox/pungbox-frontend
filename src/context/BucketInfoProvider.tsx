import { createContext, useContext, useState } from 'react';

type BucketInfoType = {
  id: string;
  expiredAt: string;
};

export const BucketInfoContext = createContext({
  bucketInfo: {
    id: '',
    expiredAt: '',
  },
  setBucketInfo: (bucketInfo: BucketInfoType) => {},
});

export const useBucketInfoContext = () => useContext(BucketInfoContext);

const BucketInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [bucketInfo, setBucketInfo] = useState<BucketInfoType>({
    id: '',
    expiredAt: '',
  });

  return <BucketInfoContext.Provider value={{ bucketInfo, setBucketInfo }}>{children}</BucketInfoContext.Provider>;
};

export default BucketInfoProvider;
