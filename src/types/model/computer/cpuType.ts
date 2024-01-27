import { IHardware } from '@/types/model/computer/commonType';

export type ICpu = IHardware & {
  coreCount: number;
  threadCount: number | null;
  baseClock: number | null;
  boostClock: number | null;
};
