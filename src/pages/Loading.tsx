import { Icons } from '@/components/ui/icons.tsx';

export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Icons.spinner
        className="w-12 h-12 animate-spin"
        aria-label="Loading..."
      />
    </div>
  );
}
