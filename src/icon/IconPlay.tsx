import React from 'react';

export interface IconPlayProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export const IconPlay: React.SFC<IconPlayProps> = (
  props: IconPlayProps
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
      className="feather feather-play"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: 'middle', ...style }}
      {...restProps}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
};

IconPlay.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default IconPlay;
