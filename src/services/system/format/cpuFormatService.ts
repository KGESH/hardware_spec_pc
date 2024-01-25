import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { ICpu } from '@/types/model/computer/cpuType.ts';
import { CPU_VENDOR_NAME_TABLE } from '@/constants/cpuConstants.ts';

export function formatCpuDisplayName(dto: ISystemInfo): string {
  // macOS
  if (dto.os_type === 'Darwin') {
    return `${dto.system.cpu.brand} / ${dto.system.cpu.core_count} Core`;
  }

  // Windows
  return dto.system.cpu[0].Name;
}

export function formatCpuBrand(sourceName: string): string {
  const nameTable = CPU_VENDOR_NAME_TABLE.map((name) => name.toLowerCase());

  for (const [index, name] of nameTable.entries()) {
    if (sourceName.toLowerCase().includes(name)) {
      return CPU_VENDOR_NAME_TABLE[index];
    }
  }

  return sourceName;
}

export function transformCpu(dto: ISystemInfo): ICpu {
  if (dto.os_type === 'Darwin') {
    return {
      type: 'CPU',
      displayName: formatCpuDisplayName(dto),
      vendorName: formatCpuBrand(dto.system.cpu.vendor_id),
      coreCount: dto.system.cpu.core_count,
    };
  }

  if (dto.os_type === 'Windows') {
    return {
      type: 'CPU',
      displayName: formatCpuDisplayName(dto),
      vendorName: formatCpuBrand(dto.system.cpu[0].Manufacturer),
      coreCount: dto.system.cpu[0].NumberOfCores,
    };
  }

  return {
    type: 'CPU',
    displayName: '',
    vendorName: '',
    baseClock: 0,
    boostClock: 0,
    coreCount: 0,
    threadCount: 0,
  };
}
