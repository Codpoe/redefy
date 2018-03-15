import React from 'react';
import PropTypes from 'prop-types';

import './form.css';

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        
        this.items = [];
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getChildContext() {
        return {
            form: this
        };
    }

    handleSubmit(ev) {
        ev.preventDefault();
        const { onSubmit } = this.props;
        onSubmit && onSubmit({ valid: this.validate() }, ev);
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    validate() {
        let valid = true;
        this.items.forEach((item) => {
            if (!item.validate() && valid) {
                valid = false;
            }
        });
        return valid;
    }
    
    reset() {
        const initialForm = {};
        this.items.forEach((item) => {
            Object.assign(initialForm, item.reset())
        });
        return initialForm;
    }

    render() {
        const {
            labelPosition,
            children,
            className,
            style
        } = this.props;

        return (
            <form
                className={`
                    z-form
                    z-form--label-${labelPosition || 'right'}
                    ${className}
                `}
                style={style}
                onSubmit={this.handleSubmit}
            >
                {children}
            </form>
        )
    }
}

Form.childContextTypes = {
    form: PropTypes.any
};

Form.propTypes = {
    labelPosition: PropTypes.oneOf(['right', 'left', 'top']),
    labelWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    labelHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object,
    onSubmit: PropTypes.func
};

Form.defaultProps = {
    labelPosition: 'right'
}