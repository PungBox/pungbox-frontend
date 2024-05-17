function downloadFile(urls: string[]): void {
  urls.forEach((url) => window.location.href = url);
}

export { downloadFile };