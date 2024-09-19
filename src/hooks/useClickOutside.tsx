import { useEffect, useRef, RefObject } from 'react';

type UseClickOutsideHook = (callback: () => void) => RefObject<HTMLDivElement>;

const useClickOutside: UseClickOutsideHook = (callback) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setTimeout(() => {
          callback();
        }, 0);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

export default useClickOutside;
