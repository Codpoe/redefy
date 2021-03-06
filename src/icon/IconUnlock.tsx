import React from 'react';

export interface IconUnlockProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const IconUnlock: React.SFC<IconUnlockProps> = (
  props: IconUnlockProps
): React.ReactElement => {
  const { color, size, style, ...restProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      className="feather feather-unlock"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: 'middle', ...style }}
      {...restProps}
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 9.9-1" />
    </svg>
  );
};

IconUnlock.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default IconUnlock;
