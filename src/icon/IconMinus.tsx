import React from 'react';

export interface IconMinusProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const IconMinus: React.SFC<IconMinusProps> = (
  props: IconMinusProps
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
      className="feather feather-minus"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: 'middle', ...style }}
      {...restProps}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

IconMinus.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default IconMinus;
