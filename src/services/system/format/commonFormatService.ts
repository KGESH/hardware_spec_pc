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
