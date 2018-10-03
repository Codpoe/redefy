import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Pop from '../pop/';
import './tooltip.css';

export default class Tooltip extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            content,
            position,
            trigger,
            children
        } = this.props;

        const classes = classnames('x-tooltip__content', {
            [`x-tooltip__content--${position}`]: true
        });

        const popContent = (
            <div className={classes}>
                {content}
            </div>
        );

        return (
            <Pop
                content={popContent}
                position={`${position}-center`}
                trigger={trigger}
                controlled={false}
                active={true}
            >
                {children}
            </Pop>
        );
    }
}

Tooltip.propTypes = {
    content: PropTypes.any,
    position: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
    trigger: PropTypes.oneOf(['hover', 'focus'])
};

Tooltip.defaultProps = {
    position: 'top',
    trigger: 'hover'
};
