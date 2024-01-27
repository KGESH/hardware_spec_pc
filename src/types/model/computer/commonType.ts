type IHardwareType = 'CPU' | 'GPU' | 'RAM' | 'M/B' | 'DISK' | 'OTHER';

export type IHardware = {
  hwKey: string;
  vendorName: string;
  displayName: string;
  type: IHardwareType;
};
