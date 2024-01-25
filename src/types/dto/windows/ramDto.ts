export type IWindowsRam = {
  Capacity: number;
  Speed: number;
  Manufacturer: string; // Samsung, etc.
  MemoryType: number; // DDR3, DDR4, DDR5, etc.
  PartNumber: string;
  SMBIOSMemoryType: number; // Todo: check PascalCase. smbios_memory_type
  SerialNumber: string | null;
  FormFactor: number | null;
  DeviceLocator: string | null;
  Tag: string | null;
  DataWidth: number | null;
  TotalWidth: number | null;
};
