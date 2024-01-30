export type IMacDisk = {
  name: string;
  kind: 'ssd' | 'hdd';
  file_system: string;
  total_space: number;
  available_space: number;
  removable: boolean;
};
