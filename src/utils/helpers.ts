/**
 * Utility to safely open a new window without target=_blank vulnerability
 *
 * @param url The url for the new window
 */
export function safeOpenWindow(url: string | null): void {
  if (url) {
    const newWindow = window.open(url);

    if (newWindow) {
      newWindow.opener = null;
    }
  }
}

/**
 * Utility to convert file to base64 for API posting
 *
 * @param file The file of interest
 */
export function toBase64(file: File): Promise<ArrayBuffer | string | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

/**
 * Utility to verify an object is empty/has no defined keys
 *
 * @param o The object of interest
 */
export function objectIsEmpty(o: object): boolean {
  return Object.keys(o).length === 0;
}
