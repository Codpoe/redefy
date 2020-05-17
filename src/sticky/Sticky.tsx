import React, {
  CSSProperties,
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import cx from 'classnames';
import bem from '../utils/bem';
import useScroll from '../utils/use-scroll';
import { getRect, getScroll } from '../utils/dom';

const b = bem('rdf-sticky');

type FixedPosition = 'top' | 'bottom' | undefined;

export interface StickyProps {
  top?: number | string;
  bottom?: number | string;
  root?: Element | null;
  onScroll?: (params: { scrollTop: number; isFixed: boolean }) => void;
  className?: string;
  style?: CSSProperties;
}

export const Sticky: React.FC<StickyProps> = props => {
  const { top, bottom, onScroll, className, style, children } = props;
  const el = useRef<HTMLDivElement>(null);
  const [fixedPosition, setFixedPosition] = useState<FixedPosition>();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [left, setLeft] = useState<number>();

  const check = useCallback(
    (scrollTop?: number) => {
      if (!el.current) {
        return;
      }

      const width = el.current.offsetWidth;
      const height = el.current.offsetHeight;
      const { height: viewportHeight } = getRect(window);
      const {
        top: topToViewport,
        bottom: bottomToViewport,
        left: leftToViewport,
      } = getRect(el.current);
      let fixedPosition: FixedPosition;

      if (typeof bottom === 'undefined') {
        if (topToViewport < Number(top)) {
          fixedPosition = 'top';
        }
      } else if (bottomToViewport > viewportHeight - Number(bottom)) {
        fixedPosition = 'bottom';
      }

      setWidth(width);
      setHeight(height);
      setLeft(leftToViewport);
      setFixedPosition(fixedPosition);

      if (onScroll) {
        if (typeof scrollTop === 'undefined') {
          scrollTop = getScroll(window).top;
        }

        onScroll({
          isFixed: Boolean(fixedPosition),
          scrollTop,
        });
      }
    },
    [top, bottom, onScroll]
  );

  useEffect(check, []);

  useScroll(
    ({ position }) => {
      check(position.top);
    },
    [check]
  );

  const placeholderStyle = useMemo(() => {
    if (fixedPosition) {
      return { width, height };
    }
  }, [fixedPosition, width, height]);

  const contentStyle = useMemo(() => {
    const styles: CSSProperties = { ...style, left, width };

    if (typeof bottom === 'undefined') {
      styles.top = top;
    } else {
      styles.bottom = bottom;
    }

    return styles;
  }, [style, top, bottom, width, fixedPosition]);

  const cls = cx(className, b(), {
    [b('', 'fixed')]: fixedPosition,
  });

  return (
    <div ref={el} style={placeholderStyle}>
      <div className={cls} style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

Sticky.defaultProps = {
  top: 0,
};

export default Sticky;
