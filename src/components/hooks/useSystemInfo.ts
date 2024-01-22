import { getSystemInfo } from '@/services/system/systemInfoService';
import { useQuery } from '@tanstack/react-query';

export const useSystemInfo = () => {
  return useQuery({
    queryFn: getSystemInfo,
    queryKey: ['systemInfo'],
  });
};
