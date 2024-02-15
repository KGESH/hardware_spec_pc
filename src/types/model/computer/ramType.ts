import { IHardware } from '@/types/model/computer/commonType';
import { MEMORY_TYPE } from '@/constants/ramConstants.ts';

export type IRamPlatform = 'desktop' | 'laptop';

export type IRamDDRType = keyof typeof MEMORY_TYPE;

export type IRam = IHardware & {
  platform: IRamPlatform;
  ddrType: IRamDDRType;
};
