import { ICpu } from '@/types/model/computer/cpuType';
import { IMotherboard } from '@/types/model/computer/motherboardType';
import { IGpu } from '@/types/model/computer/gpuType';
import { IRam } from '@/types/model/computer/ramType';
import { IDisk } from '@/types/model/computer/diskType';
import { IOperatingSystem } from '@/types/model/computer/osType';

export type IComputer = {
  os: IOperatingSystem;
  cpu: ICpu;
  motherboard?: IMotherboard;
  gpu?: IGpu;
  rams: IRam[];
  disks: IDisk[];
};
