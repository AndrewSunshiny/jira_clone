import { useEffect } from 'react';

import KeyCodes from '@/shared/constants/keyCodes';

const useOnEscapeKeydown = (isListening: boolean, onEscapeKeyDown: () => void) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === KeyCodes.Escape) onEscapeKeyDown();
    };

    if (isListening) document.addEventListener('keydown', handleKeydown);

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isListening, onEscapeKeyDown]);
};

export default useOnEscapeKeydown;
