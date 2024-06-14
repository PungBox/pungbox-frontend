import { useAuth } from 'components/Context/AuthContext';
import { useEffect, useMemo, useState } from 'react';
import { GetBucketInfoResponse, getBucketInfo } from 'service/service';

const useBucktInfo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [bucketInfo, setBucketInfo] = useState<GetBucketInfoResponse>({
    bucketId: '',
    bucketName: '',
    bucketCode: '',
    expired: false,
    expiredAt: '',
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

  const { bucketId } = useAuth();

  useEffect(() => {
    console.log(bucketId);
    if (!bucketId) return;

    setIsLoading(true);
    getBucketInfo(bucketId).then((res) => {
      setBucketInfo(res);
      setIsLoading(false);
    });
  }, [bucketId]);

  useEffect(() => {
    if (bucketInfo.expired) return;
    const intervalId = setInterval(() => {
      const now = new Date();
      const expiredAt = new Date(bucketInfo.expiredAt);
      const diff = expiredAt.getTime() - now.getTime();
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
export default useBucktInfo;
