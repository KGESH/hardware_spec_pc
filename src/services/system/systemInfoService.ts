import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { IComputer } from '@/types/model/computer/computerType.ts';
import { invokeSystemCommand } from '../tauri/invoke/invoke.ts';
import { transformCpu } from '@/services/system/format/cpuFormatService.ts';
import { transformRams } from '@/services/system/format/ramFormatService.ts';
import { transformGpu } from '@/services/system/format/gpuFormatService.ts';
import { transformMotherboard } from '@/services/system/format/motherboardFormatService.ts';
import { transformDisks } from '@/services/system/format/diskFormatService.ts';

function transform(dto: ISystemInfo): IComputer {
  switch (dto.os_type) {
    case 'Darwin':
      return {
        os: { name: dto.system.os.name },
        cpu: transformCpu(dto),
        gpu: transformGpu(dto),
        rams: transformRams(dto),
        disks: transformDisks(dto),
      };

    case 'Windows':
      return {
        os: { name: dto.system.os[0].Name },
        cpu: transformCpu(dto),
        motherboard: transformMotherboard(dto),
        gpu: transformGpu(dto),
        rams: transformRams(dto),
        disks: transformDisks(dto),
      };

    // case 'Linux':
    //Todo: Implement Linux

    default:
      return {
        os: { name: 'UNKNOWN' },
        cpu: transformCpu(dto),
        rams: transformRams(dto),
        disks: transformDisks(dto),
      };
  }
}

export async function getSystemInfo(): Promise<IComputer> {
  const response = await invokeSystemCommand<ISystemInfo>('get_system_info');

  console.log(response);

  return transform(response);
}
