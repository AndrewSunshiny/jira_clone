import { useEffect, useRef } from 'react';
import type { Ref, RefObject } from 'react';

const useOnOutsideClick = (
  $elementRef: Ref<HTMLElement>,
  isListening: boolean,
  onOutsideClick: () => void,
) => {
  const $mouseDownTargetRef: RefObject<Node | null> = useRef(null);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      $mouseDownTargetRef.current = event.target as Node;
    };
    const handleMouseUp = (event: MouseEvent) => {
      if (
        event.button === 0
        && $elementRef
        && 'current' in $elementRef
        && !$elementRef.current?.contains($mouseDownTargetRef.current as Node)
        && !$elementRef.current?.contains(event.target as Node)
      ) {
        onOutsideClick();
      }
    };

    if (isListening) {
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [$elementRef, isListening, onOutsideClick]);
};

export default useOnOutsideClick;
