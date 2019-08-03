import React from 'react';

export interface ChevronUpProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const ChevronUp: React.SFC<ChevronUpProps> = (
  props: ChevronUpProps
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
      className="feather feather-chevron-up"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: 'middle', ...style }}
      {...restProps}
    >
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
};

ChevronUp.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default ChevronUp;
