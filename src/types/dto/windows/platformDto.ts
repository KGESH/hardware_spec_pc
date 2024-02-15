export const WINDOWS_PLATFORM_TYPE = {
  DESKTOP: 3,
  LAPTOP: 9,
  NOTEBOOK: 10,
} as const;

export type IWindowsPlatform = {
  ChassisTypes: number[];
};
