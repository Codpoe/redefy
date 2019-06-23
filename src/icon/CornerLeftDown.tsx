import React from 'react';

export interface CornerLeftDownProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const CornerLeftDown: React.SFC<CornerLeftDownProps> = (
  props: CornerLeftDownProps
): React.ReactElement => {
  const { color, size, ...restProps } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      className="feather feather-corner-left-down"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <polyline points="14 15 9 20 4 15" />
      <path d="M20 4h-7a4 4 0 0 0-4 4v12" />
    </svg>
  );
};

CornerLeftDown.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default CornerLeftDown;
