import { getSystemInfo } from '@/services/system/systemInfoService.ts';
import { useQuery } from '@tanstack/react-query';

export const useSystemInfo = () => {
  return useQuery({
    queryFn: getSystemInfo,
    queryKey: ['systemInfo'],
  });
};
