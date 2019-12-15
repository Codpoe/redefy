import React from 'react';

export interface IconCheckProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const IconCheck: React.SFC<IconCheckProps> = (
  props: IconCheckProps
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
      className="feather feather-check"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: 'middle', ...style }}
      {...restProps}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
};

IconCheck.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default IconCheck;
