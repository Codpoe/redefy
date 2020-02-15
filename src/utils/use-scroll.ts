import { useRef, useLayoutEffect, RefObject } from 'react';
import { getScroll } from './dom';
import { isBrowser } from './vars';

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
  element?: HTMLElement | Window | RefObject<HTMLElement>;
  wait?: number;
}

export default function useScroll(
  effect: Effect,
  deps?: readonly any[],
  options?: Options
) {
  // for ssr
  if (!isBrowser) {
    return;
  }

  const positionRef = useRef<Position>({ top: 0, left: 0 });

  useLayoutEffect(() => {
    const { element = window, wait } = options || {};
    let timer: any = null;
    let el: HTMLElement | Window | null | undefined;

    if (element instanceof HTMLElement || element === window) {
      el = element;
    } else if (element) {
      el = (element as RefObject<HTMLElement>).current;
    }

    if (!el) {
      return;
    }

    positionRef.current = getScroll(el);

    const callback = () => {
      const position = getScroll(el as NonNullable<typeof el>);

      effect({ position, prevPosition: positionRef.current });
      positionRef.current = position;
      timer = null;
    };

    const handleScroll = () => {
      if (wait) {
        if (timer === null) {
          timer = setTimeout(callback, wait);
        }
      } else {
        callback();
      }
    };

    el.addEventListener('scroll', handleScroll);

    return () =>
      (el as NonNullable<typeof el>).removeEventListener(
        'scroll',
        handleScroll
      );
  }, deps);
}
