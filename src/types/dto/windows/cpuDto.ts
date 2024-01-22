export type IWindowsCpu = {
  Name: string;
  Manufacturer: string;
  Caption: string;
  NumberOfCores: number;
  NumberOfLogicalProcessors: number;
  MaxClockSpeed: number;
  CurrentClockSpeed: number | null;
  AddressWidth: number | null;
  Architecture: number | null;
  AssetTag: string | null;
  Availability: number | null;
  ProcessorId: string | null;
  Status: string | null;
};
