import React from 'react';

export interface ShieldOffProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const ShieldOff: React.SFC<ShieldOffProps> = (
  props: ShieldOffProps
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
      className="feather feather-shield-off"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18" />
      <path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
};

ShieldOff.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default ShieldOff;