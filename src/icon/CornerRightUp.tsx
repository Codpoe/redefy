import React from 'react';

export interface CornerRightUpProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const CornerRightUp: React.SFC<CornerRightUpProps> = (
  props: CornerRightUpProps
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
      className="feather feather-corner-right-up"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <polyline points="10 9 15 4 20 9" />
      <path d="M4 20h7a4 4 0 0 0 4-4V4" />
    </svg>
  );
};

CornerRightUp.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default CornerRightUp;
