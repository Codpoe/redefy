import React from 'react';

export interface CloudSnowProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const CloudSnow: React.SFC<CloudSnowProps> = (
  props: CloudSnowProps
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
      className="feather feather-cloud-snow"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="8" y1="20" x2="8" y2="20" />
      <line x1="12" y1="18" x2="12" y2="18" />
      <line x1="12" y1="22" x2="12" y2="22" />
      <line x1="16" y1="16" x2="16" y2="16" />
      <line x1="16" y1="20" x2="16" y2="20" />
    </svg>
  );
};

CloudSnow.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default CloudSnow;
