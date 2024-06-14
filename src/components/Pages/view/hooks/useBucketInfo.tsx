import { useBucketInfoContext } from 'context/BucketInfoProvider';
import { useEffect, useMemo, useState } from 'react';
import { getBucketInfo } from 'service/service';

const useBucketInfo = () => {
  const { bucketInfo: registeredBucketInfo } = useBucketInfoContext();
  const [isLoading, setIsLoading] = useState(false);
  const [bucketInfo, setBucketInfo] = useState({
    bucketId: '',
    bucketName: '',
    expired: false,
    expiration: '',
  });
  const [timeToExpire, setTimeToExpire] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!registeredBucketInfo.id) return;
    setIsLoading(true);
    getBucketInfo(registeredBucketInfo.id).then((res) => {
      setBucketInfo({
        bucketId: res.bucketId,
        bucketName: res.bucketName,
        expired: !!res.expired,
        expiration: res.expiredAt,
      });
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (bucketInfo.expired) return;
    const intervalId = setInterval(() => {
      const now = new Date();
      const expiration = new Date(bucketInfo.expiration);
      const diff = expiration.getTime() - now.getTime();
      setTimeToExpire({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [bucketInfo]);

  return { isLoading, bucketInfo, timeToExpire };
};
export default useBucketInfo;
