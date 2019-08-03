import React from 'react';

export interface Navigation2Props extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const Navigation2: React.SFC<Navigation2Props> = (
  props: Navigation2Props
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
      className="feather feather-navigation-2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ verticalAlign: 'middle', ...style }}
      {...restProps}
    >
      <polygon points="12 2 19 21 12 17 5 21 12 2" />
    </svg>
  );
};

Navigation2.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default Navigation2;
