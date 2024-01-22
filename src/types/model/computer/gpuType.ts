import { IHardware } from '@/types/model/computer/commonType';

export type IGpu = IHardware & {
  subVendorName?: string;
};
