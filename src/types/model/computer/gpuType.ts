import { IHardware } from '@/types/model/computer/commonType';

export type IGpu = IHardware & {
  chipset: string;
  subVendorName: string | null;
};
