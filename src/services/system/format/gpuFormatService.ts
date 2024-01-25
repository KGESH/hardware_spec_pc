import { IGpu } from '@/types/model/computer/gpuType.ts';
import { ISystemInfo } from '@/types/dto/commonDto.ts';

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
      vendorName: dto.system.gpu[0].AdapterCompatibility,
    };
  }

  return {
    type: 'GPU',
    displayName: '',
    vendorName: '',
  };
}
