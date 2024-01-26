import { IComputer } from '@/types/model/computer/computerType.ts';
import {
  getLocalStorage,
  setLocalStorage,
} from '@/services/common/localStorageService.ts';
import { v4 as uuidV4 } from 'uuid';

const ESTIMATE_ID = 'ESTIMATE_ID';
const ENCODED_ID = 'ENCODED_ID';

export function getEstimateId(): string | null {
  return getLocalStorage(ESTIMATE_ID);
}

export function saveEstimateId(id: string): void {
  setLocalStorage(ESTIMATE_ID, id);
}

export function getEncodedId(): string | null {
  return getLocalStorage(ENCODED_ID);
}

export function saveEncodedId(id: string) {
  return setLocalStorage(ENCODED_ID, id);
}

/**
 * Unique estimate id per PC.
 * Check for estimate status by estimate ID and encoded ID.
 */
export function getOrCreateEstimateId(): string {
  return uuidV4();

  // const id = getEstimateId();

  // if (id) return id;

  // const newId = uuidV4();

  // saveEstimateId(newId);

  // return newId;
}

/**
 * Encode hardware's display names to estimate id
 */
export function createHardwareComponentsEncodingId({
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

  const encodedId = btoa(displayNames);

  return encodedId;
}
