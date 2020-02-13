import { useEffect } from 'react';
import { isBrowser } from './vars';

export interface Options {
  useCapture?: boolean;
  deps?: React.DependencyList;
}

export default function useWindowEvent(
  eventName: keyof WindowEventMap,
  func: (...args: any[]) => any,
  options: Options = {}
) {
  if (!isBrowser) {
    return;
  }

  useEffect(() => {
    window.addEventListener(eventName, func, options.useCapture);
    return () => {
      window.removeEventListener(eventName, func);
    };
  }, options.deps);
}
