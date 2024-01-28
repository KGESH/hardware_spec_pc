import { IGpu } from '@/types/model/computer/gpuType.ts';
import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { GPU_VENDOR_NAME_TABLE } from '@/constants/gpuConstants.ts';

export function formatGpuVendor(sourceName: string): string {
  const vendor =
    GPU_VENDOR_NAME_TABLE.find((vendor) =>
      sourceName.toLowerCase().includes(vendor.toLowerCase()),
    ) ?? sourceName;

  return vendor;
}
export function transformGpu(dto: ISystemInfo): IGpu {
  if (dto.os_type === 'Darwin') {
    return {
      type: 'GPU',
      hwKey: `${dto.system.gpu.brand} / ${dto.system.gpu.core_count} Core`,
      displayName: `${dto.system.gpu.brand} / ${dto.system.gpu.core_count} Core`,
      vendorName: dto.system.gpu.vendor_id,
      chipset: `${dto.system.gpu.brand} / ${dto.system.gpu.core_count} Core`,
      subVendorName: null,
    };
  }

  if (dto.os_type === 'Windows') {
    return {
      type: 'GPU',
      hwKey: dto.system.gpu[0].Caption,
      displayName: dto.system.gpu[0].Caption,
      vendorName: formatGpuVendor(dto.system.gpu[0].AdapterCompatibility),
      chipset: dto.system.gpu[0].VideoProcessor,
      subVendorName: null,
    };
  }

  return {
    type: 'GPU',
    hwKey: '',
    displayName: '',
    chipset: '',
    vendorName: '',
    subVendorName: null,
  };
}
