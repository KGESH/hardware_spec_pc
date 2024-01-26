import { useSystemInfo } from '@/hooks/useSystemInfo';
import { HardwarePanel } from '@/components/HardwarePanel';
import { Button } from '@/components/ui/button';
import EstimateButton from '@/components/EstimateButton.tsx';
import LoadingPage from '@/pages/Loading.tsx';

export default function SystemInfo() {
  const systemQuery = useSystemInfo();

  if (systemQuery.isPending || !systemQuery.data) return <LoadingPage />;

  return (
    <div>
      <HardwarePanel {...systemQuery.data} />

      <h3>Your system info</h3>
      <p className="text-red-500">{`${JSON.stringify(systemQuery.data, null, 4)}`}</p>

      <Button
        type="button"
        disabled={systemQuery.isPending}
        onClick={() => systemQuery.refetch()}
        className="px-4 py-2"
        variant="outline"
        size="lg"
      >
        시스템 정보 새로고침
      </Button>
      <EstimateButton {...systemQuery.data} />
    </div>
  );
}
