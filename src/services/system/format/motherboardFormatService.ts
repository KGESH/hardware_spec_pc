import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { IMotherboard } from '@/types/model/computer/motherboardType.ts';

export function transformMotherboard(
  dto: ISystemInfo,
): IMotherboard | undefined {
  if (dto.os_type === 'Windows') {
    return {
      type: 'M/B',
      displayName:
        dto.system.motherboard[0].Product ??
        dto.system.motherboard[0].Model ??
        dto.system.motherboard[0].Caption, // Caption or Name
      vendorName: dto.system.motherboard[0].Manufacturer,
      chipset: dto.system.motherboard[0].Product,
    };
  }
}
