import { IWindowsRam } from '@/types/dto/windows/ramDto.ts';
import {
  MEMORY_TYPE,
  RAM_VENDOR_NAME_TABLE,
} from '@/constants/ramConstants.ts';
import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { IRam, IRamDDRType } from '@/types/model/computer/ramType.ts';
import { formatBytes } from '@/services/system/format/commonFormatService.ts';

export function formatRamVendor(ram: IWindowsRam): string {
  const vendor =
    RAM_VENDOR_NAME_TABLE.find((vendor) =>
      ram.Manufacturer.toLowerCase().includes(vendor.toLowerCase()),
    ) ?? ram.Manufacturer;

  return vendor;
}

export function formatPhysicalMemoryType(ram: IWindowsRam): IRamDDRType {
  switch (ram.MemoryType) {
    case MEMORY_TYPE.DDR1:
      return 'DDR1';
    case MEMORY_TYPE.DDR2:
      return 'DDR2';
    case MEMORY_TYPE.DDR3:
      return 'DDR3';
    case MEMORY_TYPE.DDR4:
      return 'DDR4';
    case MEMORY_TYPE.DDR5:
      return 'DDR5';
    default:
      throw new Error(`Unknown memory type: ${ram.MemoryType}`);
  }
}

export function formatMemoryType(ram: IWindowsRam): IRamDDRType {
  console.log(`formatMemoryType: `, ram);
  if (ram.MemoryType === 0 && ram.SmbiosMemoryType === 0) {
    throw new Error('Memory type is not defined');
  }

  switch (ram.SmbiosMemoryType) {
    case MEMORY_TYPE.DDR1:
      return 'DDR1';
    case MEMORY_TYPE.DDR2:
      return 'DDR2';
    case MEMORY_TYPE.DDR3:
      return 'DDR3';
    case MEMORY_TYPE.DDR4:
      return 'DDR4';
    case MEMORY_TYPE.DDR5:
      return 'DDR5';
    default:
      return formatPhysicalMemoryType(ram);
  }
}

export function transformRams(dto: ISystemInfo): IRam[] {
  if (dto.os_type === 'Windows') {
    return dto.system.rams.map((ram) => ({
      type: 'RAM',
      hwKey: `${formatMemoryType(ram)} / ${ram.Speed} / ${formatBytes(ram.Capacity)}`,
      displayName: `${formatMemoryType(ram)} / ${ram.Speed} / ${formatBytes(ram.Capacity)}`,
      vendorName: formatRamVendor(ram),
      ddrType: formatMemoryType(ram),
      platform: 'desktop',
    }));
  }

  if (dto.os_type === 'Darwin') {
    return dto.system.rams.map((ram) => ({
      type: 'RAM',
      hwKey: formatBytes(ram.total_memory),
      displayName: formatBytes(ram.total_memory),
      vendorName: dto.system.cpu.vendor_id,
      ddrType: 'DDR4', // Todo: replace
      platform: 'laptop',
    }));
  }

  // Unknown OS
  return [];
}
