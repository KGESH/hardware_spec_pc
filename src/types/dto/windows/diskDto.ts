export type IWindowsDisk = {
  Caption: string | null;
  Model: string | null;
  Size: number;
  Manufacturer: string;
  InterfaceType: string; // Todo: Check SSD or HDD
  SerialNumber: string | null;
  Availability: number | null;
  BytesPerSector: number | null;
  DeviceID: string | null;
  FirmwareRevision: string | null;
  MediaType: string | null;
  Partitions: number | null;
  PNPDeviceID: string | null;
  SectorsPerTrack: number | null;
  Status: string | null;
  TotalCylinders: number | null;
  TotalHeads: number | null;
  TotalSectors: number | null;
  TotalTracks: number | null;
};
