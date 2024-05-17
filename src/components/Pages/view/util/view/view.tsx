function downloadFiles(urls: string[]): void {
  urls.forEach((url) => window.open(url));
}

export { downloadFiles };