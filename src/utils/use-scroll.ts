import { useRef, useLayoutEffect } from 'react';
import { getScroll } from './dom';

interface Position {
  top: number;
  left: number;
}

interface EffectParams {
  prevPosition: Position;
  position: Position;
}

type Effect = (params: EffectParams) => void;

interface Options {
  element?: HTMLElement | Window;
  wait?: number;
}

export default function useScroll(
  effect: Effect,
  deps?: readonly any[],
  options?: Options
) {
  // for ssr
  if (typeof window === 'undefined') {
    return;
  }

  const { element, wait } = options || {};
  const positionRef = useRef(getScroll(element));

  let timer: any = null;

  const callback = () => {
    const position = getScroll(element);

    effect({ position, prevPosition: positionRef.current });
    positionRef.current = position;
    timer = null;
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (timer === null) {
          timer = setTimeout(callback, wait);
        }
      } else {
        callback();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, deps);
}
