export type IWindowsRam = {
  Capacity: number;
  Speed: number;
  Manufacturer: string; // Samsung, etc.
  MemoryType: number; // Physical memory type. ( DDR3(24), DDR4(26), DDR5(28), etc.)
  SMBIOSMemoryType: number; // SMBIOS memory type. ( DDR3(24), DDR4(26), DDR5(28), etc.)
  PartNumber: string;
  SerialNumber: string | null;
  FormFactor: number | null;
  DeviceLocator: string | null;
  Tag: string | null;
  DataWidth: number | null;
  TotalWidth: number | null;
};
