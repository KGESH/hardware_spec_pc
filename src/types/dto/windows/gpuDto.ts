export type IWindowsGpu = {
  Name: string;
  Caption: string;
  AdapterCompatibility: string;
  VideoProcessor: string;
  Description: string | null;
  DeviceID: string | null;
  DriverDate: string | null;
  DriverVersion: string | null;
  AdapterDACType: string | null;
  AdapterRAM: number | null;
  InstalledDisplayDrivers: string | null;
};
