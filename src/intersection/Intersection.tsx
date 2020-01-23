import React, { useRef, useEffect } from 'react';
import cx from 'classnames';
import bem from '../utils/bem';

const b = bem('rdf-intersection');

export interface IntersectionProps {
  root: IntersectionObserverInit['root'];
  rootMargin: IntersectionObserverInit['rootMargin'];
  threshold: IntersectionObserverInit['threshold'];
  onEnter?: (entry: IntersectionObserverEntry) => void;
  onLeave?: (entry: IntersectionObserverEntry) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Intersection: React.FC<IntersectionProps> = props => {
  const {
    root,
    rootMargin,
    threshold,
    onEnter,
    onLeave,
    children,
    className,
    style,
  } = props;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof IntersectionObserver === 'undefined' ||
      !ref.current
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          onEnter && onEnter(entries[0]);
        } else {
          onLeave && onLeave(entries[0]);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  const cls = cx(b(), className);

  if (children) {
    return (
      <div className={cls} style={style} ref={ref}>
        {children}
      </div>
    );
  }

  return <span className={cls} ref={ref} style={{ fontSize: 0, ...style }} />;
};

export default Intersection;
