import React from 'react';

export interface TabletProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const Tablet: React.SFC<TabletProps> = (
  props: TabletProps
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
      className="feather feather-tablet"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <rect
        x="4"
        y="2"
        width="16"
        height="20"
        rx="2"
        ry="2"
        transform="rotate(180 12 12)"
      />
      <line x1="12" y1="18" x2="12" y2="18" />
    </svg>
  );
};

Tablet.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default Tablet;
