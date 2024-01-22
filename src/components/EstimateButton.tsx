import { IComputer } from '@/types/model/computer/computerType';
import { ESTIMATE_HOME_PAGE_URL } from '@/constants/url';
import { Button } from '@/components/ui/button';
import { useEstimate } from '@/components/hooks/useEstimate';

type Props = IComputer;

export default function EstimateButton(props: Props) {
  const { mutate, isSuccess, isPending } = useEstimate();

  const handleSubmit = () => {
    const url = new URL('/estimate', ESTIMATE_HOME_PAGE_URL);
    mutate({ endpoint: url.href, computer: props });
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
