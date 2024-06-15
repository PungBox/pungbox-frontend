import { useBucketInfoContext } from 'context/BucketInfoProvider';
import { useEffect, useMemo, useState } from 'react';
import { getBucketInfo } from 'service/service';

const useBucketInfo = (bucketCode: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bucketInfo, setBucketInfo] = useState({
    bucketId: '',
    bucketCode: '',
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
    console.log(bucketCode);
    if (!bucketCode) return;
    setIsLoading(true);
    getBucketInfo(bucketCode).then((res) => {
      const now = new Date();
      const expirationUtc = new Date(res.expiredAt);

      const timezoneOffsetMs = now.getTimezoneOffset() * 60 * 1000;
      const expirationLocal = new Date(expirationUtc.getTime() - timezoneOffsetMs).toString();

      setBucketInfo({
        bucketId: res.bucketId,
        bucketCode: bucketCode,
        expired: !!res.expired,
        expiration: expirationLocal,
      });
      setIsLoading(false);
    });
  }, [bucketCode]);

  useEffect(() => {
    if (bucketInfo.expired) return;
    const intervalId = setInterval(() => {
      const now = new Date();
      const expiration = new Date(bucketInfo.expiration);
      const diff = expiration.getTime() - now.getTime();
      if (diff <= 0) {
        setBucketInfo((prev) => ({ ...prev, expired: true }));
        clearInterval(intervalId);
        return;
      }
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
