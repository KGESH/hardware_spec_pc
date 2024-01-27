import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { IMotherboard } from '@/types/model/computer/motherboardType.ts';
import { MOTHERBOARD_SUB_VENDOR_NAME_TABLE } from '@/constants/motherboardConstants.ts';

export function formatMotherboardVendor(sourceName: string): string {
  if (!sourceName) return 'UNKNOWN';

  const vendor =
    MOTHERBOARD_SUB_VENDOR_NAME_TABLE.find((vendor) =>
      sourceName.toLowerCase().includes(vendor.toLowerCase()),
    ) ?? sourceName;

  return vendor;
}

export function transformMotherboard(
  dto: ISystemInfo,
): IMotherboard | undefined {
  if (dto.os_type === 'Windows') {
    const displayName =
      dto.system.motherboard[0].Product ??
      dto.system.motherboard[0].Model ??
      dto.system.motherboard[0].Caption; // Caption or Name
    return {
      type: 'M/B',
      hwKey: displayName, // Todo: check hwKey
      displayName,
      vendorName: formatMotherboardVendor(
        dto.system.motherboard[0].Manufacturer,
      ),
      chipset: dto.system.motherboard[0].Product ?? displayName,
    };
  }
}
