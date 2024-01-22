import { IWindowsSystem } from './windows/systemDto.ts';
import { IMacSystem } from './mac/systemDto.ts';

export type IWindowsSystemInfo = {
  os_type: 'Windows';
  system: IWindowsSystem;
};

export type IMacSystemInfo = {
  os_type: 'Darwin';
  system: IMacSystem;
};

export type ISystemInfo = IWindowsSystemInfo | IMacSystemInfo;
