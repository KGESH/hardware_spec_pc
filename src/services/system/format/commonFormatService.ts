import prettyBytes from 'pretty-bytes';
import * as byteFormat from 'bytes';

export function formatBytes(bytes: number): string {
  return byteFormat(bytes, { unit: 'GB' });
}

export function formatDecimalDiskSize(bytes: number): string {
  return prettyBytes(bytes, { maximumFractionDigits: 1, space: false });
}
