import { IGpu } from '@/types/model/computer/gpuType.ts';
import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { GPU_VENDOR_NAME_TABLE } from '@/constants/gpuConstants.ts';

export function formatGpuVendor(sourceName: string): string {
  const sourceBrand = sourceName.toLowerCase();
  const nameTable = GPU_VENDOR_NAME_TABLE.map((name) => name.toLowerCase());

  for (const name of nameTable) {
    if (sourceBrand.includes(name)) {
      return name;
    }
  }

  return sourceName;
}
export function transformGpu(dto: ISystemInfo): IGpu {
  if (dto.os_type === 'Darwin') {
    return {
      type: 'GPU',
      displayName: `${dto.system.gpu.brand} / ${dto.system.gpu.core_count} Core`,
      vendorName: dto.system.gpu.vendor_id,
    };
  }

  if (dto.os_type === 'Windows') {
    return {
      type: 'GPU',
      displayName: dto.system.gpu[0].Caption,
      vendorName: formatGpuVendor(dto.system.gpu[0].AdapterCompatibility),
    };
  }

  return {
    type: 'GPU',
    displayName: '',
    vendorName: '',
  };
}
