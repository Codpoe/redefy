import { useEffect } from 'react';

export default function useWindowEvent(
  eventName: keyof WindowEventMap,
  func: (...args: any[]) => any,
  useCapture: boolean = false
) {
  useEffect(() => {
    window.addEventListener(eventName, func, useCapture);
    return () => {
      window.removeEventListener(eventName, func);
    };
  });
}
