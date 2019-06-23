import React from 'react';

export interface BatteryChargingProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const BatteryCharging: React.SFC<BatteryChargingProps> = (
  props: BatteryChargingProps
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
      className="feather feather-battery-charging"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <path d="M5 18H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3.19M15 6h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3.19" />
      <line x1="23" y1="13" x2="23" y2="11" />
      <polyline points="11 6 7 12 13 12 9 18" />
    </svg>
  );
};

BatteryCharging.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default BatteryCharging;
