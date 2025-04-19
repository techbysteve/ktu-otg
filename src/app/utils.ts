export function formatBytesToKBorMB(bytes: number) {
    const KB = 1024;
    const MB = KB * 1024;
  
    if (bytes < MB) {
      return (bytes / KB).toFixed(2) + ' KB';
    } else {
      return (bytes / MB).toFixed(2) + ' MB';
    }
  }