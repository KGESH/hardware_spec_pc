import { invoke } from '@tauri-apps/api/tauri';

export async function invokeSystemCommand<T>(
  command: string,
  args?: Record<string, unknown>,
) {
  return await invoke<T>(command, args);
}
