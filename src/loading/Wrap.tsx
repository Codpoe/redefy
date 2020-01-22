import React from 'react';
import { CSSTransition } from 'react-transition-group';
import cx from 'classnames';
import Loading, { LoadingProps } from './Loading';
import bem from '../utils/bem';

const b = bem('rdf-loading-wrap');

export interface LoadingWrapProps extends Omit<LoadingProps, 'mask'> {
  loading?: boolean;
  mask?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LoadingWrap: React.FC<LoadingWrapProps> = props => {
  const {
    loading = false,
    mask = true,
    children,
    className,
    style,
    ...restProps
  } = props;
  const cls = cx(b(), className, {
    [b('', 'loading')]: loading,
    [b('', 'mask')]: mask,
  });

  return (
    <div className={cls} style={style}>
      {children && <div className={b('content')}>{children}</div>}

      <CSSTransition
        classNames="rdf-loading-wrap-anim-"
        in={loading}
        timeout={200}
        mountOnEnter
        unmountOnExit
      >
        <div className={b('loading')}>
          <Loading {...restProps} />
        </div>
      </CSSTransition>
    </div>
  );
};

export default LoadingWrap;
