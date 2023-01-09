import {useCallback, useEffect, useState} from 'react';

interface CopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => void;
}

export function useCopyToClipboard(): CopyToClipboardReturn {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const copy = useCallback((text: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (error) {
      console.error('Copy failed', error);
    }
  }, []);

  return {copy, copied};
}
