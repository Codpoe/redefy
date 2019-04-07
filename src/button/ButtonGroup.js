import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './style/group.css';

const ButtonGroup = ({ children, className }) => (
  <div className={cx('jm-button-group', className)}>
    {children}
  </div>
);

ButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default ButtonGroup;
