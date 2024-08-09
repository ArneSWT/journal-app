import { useRef } from 'react';

const useDebounce = (func: Function, wait: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => func(...args), wait);
  };
};

export default useDebounce;