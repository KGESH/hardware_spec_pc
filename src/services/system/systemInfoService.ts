import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { IComputer } from '@/types/model/computer/computerType.ts';
import { invokeSystemCommand } from '../tauri/invoke/invoke.ts';
import {
  formatBytes,
  formatMemoryType,
} from '@/services/system/formatService.ts';

function transform(dto: ISystemInfo): IComputer {
  switch (dto.os_type) {
    case 'Darwin':
      return {
        os: { name: dto.system.os.name },
        cpu: {
          type: 'CPU',
          displayName: `${dto.system.gpu.brand} / ${dto.system.cpu.core_count} Core`,
          vendorName: dto.system.cpu.vendor_id,
          coreCount: dto.system.cpu.core_count,
        },
        gpu: {
          type: 'GPU',
          displayName: `${dto.system.gpu.brand} / ${dto.system.gpu.core_count} Core`,
          vendorName: dto.system.gpu.vendor_id,
        },
        rams: dto.system.rams.map((ram) => ({
          type: 'RAM',
          displayName: formatBytes(ram.total_memory),
          vendorName: dto.system.cpu.vendor_id,
        })),
        disks: dto.system.disks.map((disk) => ({
          type: 'DISK',
          kind: disk.kind,
          totalSpace: disk.total_space,
          displayName: `${disk.name} / ${disk.kind} / ${formatBytes(disk.total_space)}`, // Todo: Size labeling check
          vendorName: dto.system.cpu.vendor_id,
        })),
      } as IComputer;

    case 'Windows':
      return {
        os: { name: dto.system.os[0].Name },
        cpu: {
          type: 'CPU',
          displayName: dto.system.cpu[0].Name,
          vendorName: dto.system.cpu[0].Manufacturer,
          coreCount: dto.system.cpu[0].NumberOfCores,
        },
        motherboard: {
          type: 'M/B',
          displayName:
            dto.system.motherboard[0].Product ??
            dto.system.motherboard[0].Model ??
            dto.system.motherboard[0].Caption, // Caption or Name
          vendorName: dto.system.motherboard[0].Manufacturer,
          chipset: dto.system.motherboard[0].Product,
        },
        gpu: {
          type: 'GPU',
          displayName: dto.system.gpu[0].Caption,
          vendorName: dto.system.gpu[0].AdapterCompatibility,
        },
        rams: dto.system.rams.map((ram) => ({
          type: 'RAM',
          displayName: `${formatMemoryType(ram)} / ${ram.Speed} / ${formatBytes(ram.Capacity)}`,
          vendorName: ram.Manufacturer,
        })),
        disks: dto.system.disks.map((disk) => ({
          type: 'DISK',
          kind: disk.InterfaceType,
          totalSpace: disk.Size,
          displayName: `${disk.Caption} / ${formatBytes(disk.Size)}`, // Todo: Size labeling check
          vendorName: disk.Manufacturer,
        })),
      };

    // case 'Linux':
    //Todo: Implement Linux

    default:
      return {
        os: {
          name: '',
        },
        cpu: {
          type: 'CPU',
          displayName: '',
          vendorName: '',
          baseClock: 0,
          boostClock: 0,
          coreCount: 0,
          threadCount: 0,
        },
        disks: [],
        rams: [],
      };
  }
}

export async function getSystemInfo(): Promise<IComputer> {
  const response = await invokeSystemCommand<ISystemInfo>('get_system_info');

  console.log(`====================`);
  console.log(`Memory Info`, response.system.rams[0]);
  console.log(`====================`);

  console.log(response);

  return transform(response);
}
