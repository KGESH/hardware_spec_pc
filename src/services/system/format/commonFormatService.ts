export function formatBytes(bytes: number): string {
  const kilobyte = 1024;
  const megabyte = kilobyte * 1024;
  const gigabyte = megabyte * 1024;
  const terabyte = gigabyte * 1024;

  if (bytes >= terabyte) {
    return `${Math.floor(bytes / terabyte)}TB`;
  } else if (bytes >= gigabyte) {
    return `${Math.floor(bytes / gigabyte)}GB`;
  } else if (bytes >= megabyte) {
    return `${Math.floor(bytes / megabyte)}MB`;
  } else if (bytes >= kilobyte) {
    return `${Math.floor(bytes / kilobyte)}KB`;
  } else {
    return `${bytes}B`;
  }
}

export function formatDecimalDiskSize(bytes: number): string {
  const kilobyte = 1000;
  const megabyte = kilobyte * 1000;
  const gigabyte = megabyte * 1000;
  const terabyte = gigabyte * 1000;

  // Convert binary-based size to decimal-based size
  let decimalBytes = (bytes * 1024 * 1024 * 1024) / gigabyte;

  if (decimalBytes >= terabyte) {
    return `${(decimalBytes / terabyte).toFixed(2)}TB`;
  } else if (decimalBytes >= gigabyte) {
    return `${(decimalBytes / gigabyte).toFixed(2)}GB`;
  } else if (decimalBytes >= megabyte) {
    return `${(decimalBytes / megabyte).toFixed(2)}MB`;
  } else if (decimalBytes >= kilobyte) {
    return `${(decimalBytes / kilobyte).toFixed(2)}KB`;
  } else {
    return `${decimalBytes.toFixed(2)}B`;
  }
}
