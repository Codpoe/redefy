import React from 'react';
import cx from 'classnames';
import Wrap from './Wrap';
import bem from '../utils/bem';

const b = bem('rdf-loading');

export interface LoadingProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  colorType?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: string | number;
  label?: React.ReactNode;
  vertical?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

interface LoadingComponent extends React.FC<LoadingProps> {
  Wrap: typeof Wrap;
}

export const Loading: LoadingComponent = props => {
  const {
    color = 'currentColor',
    colorType = 'default',
    size = '1em',
    label,
    vertical = false,
    className,
    style,
    ...restProps
  } = props;

  const cls = cx(b(''), className, {
    [b('', colorType)]: colorType !== 'default',
    [b('', 'vertical')]: vertical,
  });

  return (
    <div className={cls} style={style}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={b('svg')}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ verticalAlign: 'middle' }}
        {...restProps}
      >
        <circle className={b('path')} cx="12" cy="12" r="11" />
      </svg>
      {label && <span className={b('label')}>{label}</span>}
    </div>
  );
};

Loading.Wrap = Wrap;

export default Loading;
