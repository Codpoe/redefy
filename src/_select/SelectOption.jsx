import React from './react';
import PropTypes from './prop-types';
import classnames from './classnames';

import SelectContext from './select-context';
import './select-option.css';

class SelectOption extends React.Component {
  constructor(props) {
    super(props);
  }

  handleClick = () => {
    const { value, label, children, onSelect } = this.props;
    onSelect(value, label || children);
  };

  render() {
    const {
      value,
      selection,
      multiple,
      className,
      style,
      children,
    } = this.props;
    let selected = multiple ? selection.includes(value) : selection === value;

    const classes = classnames(className, 'x-select-option', {
      'x-select-option--selected': selected,
    });

    return (
      <li className={classes} style={style} onClick={this.handleClick}>
        {children}
      </li>
    );
  }
}

SelectOption.propTypes = {
  value: PropTypes.any,
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
};

SelectOption.defaultProps = {
  label: '',
  className: '',
  style: {},
};

export default props => (
  <SelectContext.Consumer>
    {({ value: selection, multiple, onSelect }) => (
      <SelectOption
        {...props}
        multiple
        selection={selection}
        onSelect={onSelect}
      />
    )}
  </SelectContext.Consumer>
);
