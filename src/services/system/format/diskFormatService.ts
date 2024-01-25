import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { IDisk } from '@/types/model/computer/diskType.ts';
import { formatBytes } from '@/services/system/format/commonFormatService.ts';
import { DISK_VENDOR_NAME_TABLE } from '@/constants/disk.constants.ts';
import { IWindowsDisk } from '@/types/dto/windows/diskDto.ts';

export function formatDiskVendor(disk: IWindowsDisk) {
  const vendorName = DISK_VENDOR_NAME_TABLE.find(
    (vendor) =>
      disk.Model?.toLowerCase().includes(vendor.toLowerCase()) ||
      disk.Caption?.toLowerCase().includes(vendor.toLowerCase()),
  );

  return vendorName || 'UNKNOWN';
}

export function transformDisks(dto: ISystemInfo): IDisk[] {
  if (dto.os_type === 'Windows') {
    return dto.system.disks.map((disk) => ({
      type: 'DISK',
      kind: disk.InterfaceType,
      totalSpace: disk.Size,
      displayName: `${disk.Caption} / ${formatBytes(disk.Size)}`, // Todo: Size labeling check
      vendorName: formatDiskVendor(disk),
    }));
  }

  if (dto.os_type === 'Darwin') {
    return dto.system.disks.map((disk) => ({
      type: 'DISK',
      kind: disk.kind,
      totalSpace: disk.total_space,
      displayName: `${disk.name} / ${disk.kind} / ${formatBytes(disk.total_space)}`, // Todo: Size labeling check
      vendorName: dto.system.cpu.vendor_id, // Apple
    }));
  }

  // Unknown OS
  return [];
}
