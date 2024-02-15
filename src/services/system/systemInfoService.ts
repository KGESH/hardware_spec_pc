import { ISystemInfo } from '@/types/dto/commonDto.ts';
import { IComputer } from '@/types/model/computer/computerType.ts';
import { invokeSystemCommand } from '../tauri/invoke/invoke.ts';
import { transformCpu } from '@/services/system/format/cpuFormatService.ts';
import { transformRams } from '@/services/system/format/ramFormatService.ts';
import { transformGpu } from '@/services/system/format/gpuFormatService.ts';
import { transformMotherboard } from '@/services/system/format/motherboardFormatService.ts';
import { transformDisks } from '@/services/system/format/diskFormatService.ts';
import { WINDOWS_PLATFORM_TYPE } from '@/types/dto/windows/platformDto.ts';

function transform(dto: ISystemInfo): IComputer {
  switch (dto.os_type) {
    case 'Darwin':
      return {
        os: { name: dto.system.os.name, platform: 'laptop' }, // Todo: replace platform
        cpu: transformCpu(dto),
        gpu: transformGpu(dto),
        rams: transformRams(dto),
        disks: transformDisks(dto),
      };

    case 'Windows':
      const platform = dto.system.platform[0].ChassisTypes[0];
      // Desktop or laptop
      const isKnownPlatform = (
        Object.values(WINDOWS_PLATFORM_TYPE) as number[]
      ).includes(platform);

      if (!isKnownPlatform) {
        throw new Error(`Unknown platform type: ${platform}`);
      }

      const isDesktop = platform === WINDOWS_PLATFORM_TYPE.DESKTOP;

      return {
        os: {
          name: dto.system.os[0].Name,
          platform: isDesktop ? 'desktop' : 'laptop',
        },
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
        os: { name: 'UNKNOWN', platform: 'desktop' },
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
