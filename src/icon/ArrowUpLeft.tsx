import React from 'react';

export interface ArrowUpLeftProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const ArrowUpLeft: React.SFC<ArrowUpLeftProps> = (
  props: ArrowUpLeftProps
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
      className="feather feather-arrow-up-left"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <line x1="17" y1="17" x2="7" y2="7" />
      <polyline points="7 17 7 7 17 7" />
    </svg>
  );
};

ArrowUpLeft.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default ArrowUpLeft;
