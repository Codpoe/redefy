import React from 'react';

export interface ChevronDownProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const ChevronDown: React.SFC<ChevronDownProps> = (
  props: ChevronDownProps
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
      className="feather feather-chevron-down"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: 'middle', ...style }}
      {...restProps}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
};

ChevronDown.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default ChevronDown;
