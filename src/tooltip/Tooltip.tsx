import React from 'react';
import cx from 'classnames';
import Pop, { PopProps } from '../pop/index';
import bem from '../utils/bem';
import './styles/index.css';

const b = bem('x-tooltip');

export type TooltipProps = PopProps;

const Tooltip: React.SFC<TooltipProps> = (props: TooltipProps) => (
  <Pop
    {...props}
    className={cx(b(), props.className)}
    contentClassName={cx(b('content'), props.contentClassName)}
  />
);

Tooltip.defaultProps = {
  position: 'top-center',
  withArrow: true,
};

export default Tooltip;
