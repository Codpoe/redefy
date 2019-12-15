import React from 'react';

export interface IconChevronLeftProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const IconChevronLeft: React.SFC<IconChevronLeftProps> = (
  props: IconChevronLeftProps
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
      className="feather feather-chevron-left"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: 'middle', ...style }}
      {...restProps}
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
};

IconChevronLeft.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default IconChevronLeft;
