import { IComputer } from '@/types/model/computer/computerType.ts';

const ESTIMATE_ID_KEY = 'estimateId';

export function getEstimateId(): string | null {
  if (window?.localStorage === undefined) {
    console.log('localStorage is not supported');
    return null;
  } else {
    console.log('localStorage is supported');
    return localStorage.getItem(ESTIMATE_ID_KEY);
  }
}

export function saveEstimateId(id: string) {
  if (window?.localStorage === undefined) {
    console.log('localStorage is not supported');
  } else {
    console.log('localStorage is supported');
    localStorage.setItem(ESTIMATE_ID_KEY, id);
  }
}

/**
 * Encode hardware's display names to estimate id
 */
export function createEstimateId({
  cpu,
  motherboard,
  gpu,
  rams,
  disks,
}: Omit<IComputer, 'os'>): string {
  const displayNames = [
    cpu.displayName,
    motherboard?.displayName,
    gpu?.displayName,
    ...rams.map((ram) => ram.displayName),
    ...disks.map((disk) => disk.displayName),
  ]
    .filter((displayName) => displayName !== undefined) // Filter out undefined values
    .sort((a, b) => a!.localeCompare(b!)) // Sort by alphabet
    .join('_'); // Concatenate with '_'

  console.log('displayNames', displayNames);

  const encodedEstimateId = btoa(displayNames);

  return encodedEstimateId;
}
