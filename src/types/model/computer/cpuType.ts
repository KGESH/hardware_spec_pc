import { IHardware } from '@/types/model/computer/commonType';

export type ICpu = IHardware & {
  coreCount?: number;
  threadCount?: number;
  baseClock?: number;
  boostClock?: number;
};
