import { IWindowsOs } from './osDto.ts';
import { IWindowsCpu } from './cpuDto.ts';
import { IWindowsMotherboard } from './motherboardDto.ts';
import { IWindowsGpu } from './gpuDto.ts';
import { IWindowsRam } from './ramDto.ts';
import { IWindowsDisk } from './diskDto.ts';
import { IWindowsPlatform } from '@/types/dto/windows/platformDto.ts';

export type IWindowsSystem = {
  os: IWindowsOs[];
  platform: IWindowsPlatform[];
  cpu: IWindowsCpu[];
  motherboard: IWindowsMotherboard[];
  gpu: IWindowsGpu[];
  rams: IWindowsRam[];
  disks: IWindowsDisk[];
};
