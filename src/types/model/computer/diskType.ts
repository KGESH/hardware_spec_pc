import { IHardware } from '@/types/model/computer/commonType';

export type IDisk = IHardware & {
  kind?: string;
  totalSpace?: number;
};
