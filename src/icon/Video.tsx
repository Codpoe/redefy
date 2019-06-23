import React from 'react';

export interface VideoProps extends React.SVGAttributes<SVGElement> {
  color?: string;
  size?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

const Video: React.SFC<VideoProps> = (
  props: VideoProps
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
      className="feather feather-video"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...restProps}
    >
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </svg>
  );
};

Video.defaultProps = {
  color: 'currentColor',
  size: '1em',
};

export default Video;
