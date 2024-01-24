import { useSystemInfo } from '@/hooks/useSystemInfo';
import { HardwarePanel } from '@/components/HardwarePanel';
import { Button } from '@/components/ui/button';
import EstimateButton from '@/components/EstimateButton.tsx';
import LoadingPage from '@/pages/Loading.tsx';

export default function SystemInfo() {
  const {
    isPending,
    data: systemInfo,
    refetch: fetchSystemInfo,
  } = useSystemInfo();

  if (isPending || !systemInfo) return <LoadingPage />;

  return (
    <div>
      <HardwarePanel {...systemInfo} />

      <h3>Your system info</h3>
      <p className="text-red-500">{`${JSON.stringify(systemInfo, null, 4)}`}</p>

      <Button
        type="button"
        disabled={isPending}
        onClick={() => fetchSystemInfo()}
        className="px-4 py-2"
        variant="outline"
        size="lg"
      >
        시스템 정보 새로고침
      </Button>
      <EstimateButton {...systemInfo} />
    </div>
  );
}
