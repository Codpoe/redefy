import React from 'react';

export interface MinusProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const Minus: React.SFC<MinusProps> = (
  props: MinusProps
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
      className="feather feather-minus"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

Minus.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default Minus;
