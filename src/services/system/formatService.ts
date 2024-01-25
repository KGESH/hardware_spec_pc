export function formatBytes(bytes: number): string {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;
  const terabyte = gigabyte * 1024;

  if (bytes >= terabyte) {
    return `${Math.floor(bytes / terabyte)}TB`;
  } else if (bytes >= gigabyte) {
    return `${Math.floor(bytes / gigabyte)}GB`;
  } else if (bytes >= megabyte) {
    return `${Math.floor(bytes / megabyte)}MB`;
  } else if (bytes >= kilobyte) {
    return `${Math.floor(bytes / kilobyte)}KB`;
  } else {
    return `${bytes}B`;
  }
}

import { IWindowsRam } from '@/types/dto/windows/ramDto.ts';
import { MEMORY_TYPE } from '@/constants/ram.constant.ts';

export function formatPhysicalMemoryType(ram: IWindowsRam): string {
  switch (ram.MemoryType) {
    case MEMORY_TYPE.DDR1:
      return 'ddr1';
    case MEMORY_TYPE.DDR2:
      return 'ddr2';
    case MEMORY_TYPE.DDR3:
      return 'ddr3';
    case MEMORY_TYPE.DDR4:
      return 'ddr4';
    case MEMORY_TYPE.DDR5:
      return 'ddr5';
    default:
      return 'UNKNOWN';
  }
}

export function formatMemoryType(ram: IWindowsRam): string {
  if (ram.MemoryType === 0 && ram.SMBIOSMemoryType === 0) {
    return 'UNKNOWN';
  }

  switch (ram.SMBIOSMemoryType) {
    case MEMORY_TYPE.DDR1:
      return 'ddr1';
    case MEMORY_TYPE.DDR2:
      return 'ddr2';
    case MEMORY_TYPE.DDR3:
      return 'ddr3';
    case MEMORY_TYPE.DDR4:
      return 'ddr4';
    case MEMORY_TYPE.DDR5:
      return 'ddr5';
    default:
      return formatPhysicalMemoryType(ram);
  }
}
