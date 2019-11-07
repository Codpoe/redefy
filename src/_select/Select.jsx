import React from './react';
import PropTypes from './prop-types';
import classnames from './classnames';

import Input from '../input/';
import Pop from '../pop/';
import Tag from '../tag/';
import Loader from '../loader/';
import SelectOption from './SelectOption.jsx.js';
import SelectContext from './select-context';
import './select.css';

const findLabelByValue = (options, value) => {
  for (const option of options) {
    if (option.props.value === value) {
      return option.props.label || option.props.children;
    }
    if (option.type.name === 'SelectGroup') {
      let label = findLabelByValue(option.children, value);
      if (label) {
        return label;
      }
    }
  }
  return '';
};

export default class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      showClearIcon: false,
      rerenderOptions: true,
    };
  }

  static getDerivedStateFromProps({ value, multiple, children }) {
    let selection;
    let hasSelection;

    if (multiple) {
      selection = value.map(item => findLabelByValue(children, item));
      hasSelection = selection.length > 0;
    } else {
      selection = findLabelByValue(children, value);
      hasSelection = Boolean(selection);
    }

    return {
      selection,
      hasSelection,
    };
  }

  handleSelect = (optionValue, optionLabel) => {
    const { value, multiple, onSelect } = this.props;
    const { selection } = this.state;
    let resValue;
    let resLabel;

    if (multiple) {
      const index = value.indexOf(optionValue);
      resValue = value.slice();
      resLabel = selection.slice();
      if (index === -1) {
        resValue.push(optionValue);
        resLabel.push(optionLabel);
      } else {
        resValue.splice(index, 1);
        resLabel.splice(index, 1);
      }
    } else {
      resValue = optionValue;
      resLabel = optionLabel;
      this.setState({
        active: false,
      });
    }

    onSelect && onSelect(resValue, resLabel);
  };

  handlePopChange = active => {
    const { selection } = this.state;

    this.setState({
      active,
    });

    if (!active) {
      this.setState({
        selection,
      });
    }
  };

  handleInputChange = value => {
    this.setState({
      selection: value,
    });
  };

  handleInputMouseEnter = () => {
    const { value, clearable, multiple, disabled } = this.props;

    if (!disabled && !multiple && clearable && value) {
      this.setState({
        showClearIcon: true,
      });
    }
  };

  handleInputMouseLeave = () => {
    const { clearable } = this.props;

    clearable &&
      this.setState({
        showClearIcon: false,
      });
  };

  handleClear = ev => {
    const { multiple, onSelect } = this.props;
    let res;

    ev.stopPropagation();
    if (multiple) {
      res = [];
    } else {
      res = '';
    }
    onSelect && onSelect(res, res);
  };

  handleClearItem(index, ev) {
    const { value, onSelect } = this.props;
    const { selection } = this.state;
    const resValue = value.slice();
    const resLabel = selection.slice();

    ev.stopPropagation();
    ev.nativeEvent.stopImmediatePropagation();

    resValue.splice(index, 1);
    resLabel.splice(index, 1);
    onSelect && onSelect(resValue, resLabel);
  }

  defaultFilter = (option, index) => {
    const { inputValue } = this.state;
    const label = option.props.label || option.props.children;

    return label.indexOf(inputValue) !== -1;
  };

  renderSelection() {
    const {
      value,
      placeholder,
      size,
      round,
      disabled,
      filterable,
      multiple,
    } = this.props;
    const { active, selection } = this.state;

    if (multiple) {
      return selection.map((item, index) => (
        <Tag
          key={item}
          className="x-select__tag"
          color="#ECECEC"
          round={round}
          closable={!disabled}
          onClose={this.handleClearItem.bind(this, index)}
        >
          {item}
        </Tag>
      ));
    }
    return (
      <input
        className="x-select__input"
        type="text"
        value={selection}
        readOnly={!filterable}
        disabled={disabled}
        onChange={this.handleInputChange}
      />
    );
  }

  renderPlaceholder() {
    const { placeholder } = this.props;
    return <span className="x-select__placeholder">{placeholder}</span>;
  }

  renderIcon() {
    const { showClearIcon } = this.state;
    return (
      <div
        className="x-select__icon-wrapper"
        onClick={showClearIcon ? this.handleClear : null}
      >
        {showClearIcon ? (
          <i className="icon icon-x"></i>
        ) : (
          <i className="icon icon-chevron-down"></i>
        )}
      </div>
    );
  }

  renderOptions() {
    const { value, multiple, filterable, children } = this.props;
    const { rerenderOptions } = this.state;
    let options;

    return (
      <SelectContext.Provider
        value={{
          value,
          multiple,
          onSelect: this.handleSelect,
        }}
      >
        <ul className="x-select__list">{children}</ul>
      </SelectContext.Provider>
    );
  }

  renderLoading() {
    return (
      <div className="x-select__loader-wrapper">
        <Loader />
      </div>
    );
  }

  render() {
    const {
      name,
      value,
      size,
      round,
      filterable,
      loading,
      disabled,
      className,
      style,
    } = this.props;

    const { active, hasSelection } = this.state;

    let popContent;

    if (loading) {
      popContent = this.renderLoading();
    } else {
      popContent = this.renderOptions();
    }

    const classes = classnames(className, 'x-select', {
      'x-select--active': active,
      'x-select--disabled': disabled,
    });

    return (
      <div className={classes} style={style}>
        <Pop
          className="x-select__pop"
          content={popContent}
          trigger="click"
          active={active}
          disabled={disabled}
          onChange={this.handlePopChange}
        >
          <div
            className={classnames('x-select__trigger', {
              'x-select__trigger--round': round,
            })}
            onMouseEnter={this.handleInputMouseEnter}
            onMouseLeave={this.handleInputMouseLeave}
          >
            <div className="x-select__selection">
              {hasSelection ? this.renderSelection() : this.renderPlaceholder()}
            </div>
            {this.renderIcon()}
          </div>
        </Pop>
      </div>
    );
  }
}

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'normal', 'large']),
  round: PropTypes.bool,
  filterable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  loading: PropTypes.bool,
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onSelect: PropTypes.func,
};

Select.defaultProps = {
  size: 'normal',
  round: false,
  filterable: false,
  loading: false,
  clearable: false,
  disabled: false,
  multiple: false,
};
