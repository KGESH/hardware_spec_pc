export type IMacDisk = {
  name: string;
  kind: 'SSD' | 'HDD';
  file_system: string;
  total_space: number;
  removable: boolean;
};
