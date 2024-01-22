import {IMacOs} from "./osDto.ts";
import {IMacCpu} from "./cpuDto.ts";
import {IMacGpu} from "./gpuDto.ts";
import {IMacRam} from "./ramDto.ts";
import {IMacDisk} from "./diskDto.ts";

export type IMacSystem = {
  os: IMacOs;
  cpu: IMacCpu;
  gpu: IMacGpu;
  rams: IMacRam[];
  disks: IMacDisk[];
};
