import { IWindowsRam } from '@/types/dto/windows/ramDto.ts';
import {
  MEMORY_TYPE,
  RAM_VENDOR_NAME_TABLE,
} from '@/constants/ramConstants.ts';
import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { IRam } from '@/types/model/computer/ramType.ts';
import { formatBytes } from '@/services/system/format/commonFormatService.ts';

export function formatRamVendor(ram: IWindowsRam): string {
  const vendor =
    RAM_VENDOR_NAME_TABLE.find((vendor) =>
      ram.Manufacturer.toLowerCase().includes(vendor.toLowerCase()),
    ) ?? ram.Manufacturer;

  return vendor;
}

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

export function transformRams(dto: ISystemInfo): IRam[] {
  if (dto.os_type === 'Windows') {
    return dto.system.rams.map((ram) => ({
      type: 'RAM',
      displayName: `${formatMemoryType(ram)} / ${ram.Speed} / ${formatBytes(ram.Capacity)}`,
      vendorName: formatRamVendor(ram),
    }));
  }

  if (dto.os_type === 'Darwin') {
    return dto.system.rams.map((ram) => ({
      type: 'RAM',
      displayName: formatBytes(ram.total_memory),
      vendorName: dto.system.cpu.vendor_id,
    }));
  }

  // Unknown OS
  return [];
}
