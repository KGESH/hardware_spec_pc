import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { ICpu } from '@/types/model/computer/cpuType.ts';
import { CPU_VENDOR_NAME_TABLE } from '@/constants/cpu.constants.ts';

export function formatCpuDisplayName(dto: ISystemInfo): string {
  // macOS
  if (dto.os_type === 'Darwin') {
    return `${dto.system.cpu.brand} / ${dto.system.cpu.core_count} Core`;
  }

  // Windows
  return dto.system.cpu[0].Name;
}

export function formatCpuBrand({
  sourceVendorName,
  destVendorNameTable,
}: {
  sourceVendorName: string;
  destVendorNameTable: string[];
}): string {
  const sourceBrand = sourceVendorName.toLowerCase();
  const nameTable = destVendorNameTable.map((name) => name.toLowerCase());

  for (const name of nameTable) {
    if (sourceBrand.includes(name)) {
      return name;
    }
  }

  return sourceVendorName;
}

export function transformCpu(dto: ISystemInfo): ICpu {
  if (dto.os_type === 'Darwin') {
    return {
      type: 'CPU',
      displayName: formatCpuDisplayName(dto),
      vendorName: formatCpuBrand({
        sourceVendorName: dto.system.cpu.vendor_id,
        destVendorNameTable: CPU_VENDOR_NAME_TABLE,
      }),
      coreCount: dto.system.cpu.core_count,
    };
  }

  if (dto.os_type === 'Windows') {
    return {
      type: 'CPU',
      displayName: formatCpuDisplayName(dto),
      vendorName: dto.system.cpu[0].Manufacturer,
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
