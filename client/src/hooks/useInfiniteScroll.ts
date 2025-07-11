import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useInfiniteScroll(
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 1.0, rootMargin = '0px' } = options;
  const [isFetching, setIsFetching] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  const observer = useCallback((node: HTMLElement | null) => {
    if (node) setElement(node);
  }, []);

  useEffect(() => {
    if (!element) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isFetching) {
          setIsFetching(true);
          callback();
        }
      },
      { threshold, rootMargin }
    );

    intersectionObserver.observe(element);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [element, callback, isFetching, threshold, rootMargin]);

  const setIsFetchingComplete = useCallback(() => {
    setIsFetching(false);
  }, []);

  return { 
    observer, 
    isFetching, 
    setIsFetchingComplete 
  };
}