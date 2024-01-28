type IHardwareType = 'CPU' | 'GPU' | 'RAM' | 'MB' | 'DISK' | 'OTHER';

export type IHardware = {
  hwKey: string;
  vendorName: string;
  displayName: string;
  type: IHardwareType;
};
