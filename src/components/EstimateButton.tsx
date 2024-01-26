import { IComputer } from '@/types/model/computer/computerType';
import { Button } from '@/components/ui/button';
import { useEstimate } from '@/hooks/useEstimate';
import { getOrCreateEstimateId } from '@/services/estimate/id.ts';

type Props = IComputer;

export default function EstimateButton(props: Props) {
  const { mutate, isSuccess, isPending } = useEstimate();

  const handleSubmit = () => {
    mutate({
      computer: props,
      estimateId: getOrCreateEstimateId(),
    });
  };

  if (isSuccess) {
    // Change UI
  }

  return (
    <Button disabled={isPending} size="lg" type="button" onClick={handleSubmit}>
      견적 확인 & 즉시 판매
    </Button>
  );
}
