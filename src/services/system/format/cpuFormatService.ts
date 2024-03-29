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
  const vendor =
    CPU_VENDOR_NAME_TABLE.find((vendor) =>
      sourceName.toLowerCase().includes(vendor.toLowerCase()),
    ) ?? sourceName;

  return vendor;
}

export function transformCpu(dto: ISystemInfo): ICpu {
  if (dto.os_type === 'Darwin') {
    return {
      type: 'CPU',
      hwKey: formatCpuDisplayName(dto),
      displayName: formatCpuDisplayName(dto),
      vendorName: formatCpuBrand(dto.system.cpu.vendor_id),
      coreCount: dto.system.cpu.core_count,
      threadCount: null,
      baseClock: null,
      boostClock: null,
    };
  }

  if (dto.os_type === 'Windows') {
    return {
      type: 'CPU',
      hwKey: formatCpuDisplayName(dto),
      displayName: formatCpuDisplayName(dto),
      vendorName: formatCpuBrand(dto.system.cpu[0].Manufacturer),
      coreCount: dto.system.cpu[0].NumberOfCores,
      threadCount: dto.system.cpu[0].NumberOfLogicalProcessors ?? null,
      baseClock: null,
      boostClock: null,
    };
  }

  return {
    type: 'CPU',
    hwKey: '',
    displayName: '',
    vendorName: '',
    coreCount: 0,
    threadCount: 0,
    baseClock: 0,
    boostClock: 0,
  };
}
