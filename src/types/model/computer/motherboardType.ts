import { IHardware } from '@/types/model/computer/commonType';

export type IMotherboard = IHardware & {
  chipset?: string;
};
