export function getLocalStorage(key: string): string | null {
  if (window?.localStorage === undefined) {
    console.error('localStorage is not supported');
    return null;
  } else {
    return localStorage.getItem(key);
  }
}

export function setLocalStorage(key: string, value: string): void {
  if (window?.localStorage === undefined) {
    console.error('localStorage is not supported');
  } else {
    localStorage.setItem(key, value);
  }
}
