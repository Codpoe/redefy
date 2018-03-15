import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../popup/';
import './tooltip.css';

export default class Tooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
        this.handlePopupChange = this.handlePopupChange.bind(this);
    }

    handlePopupChange({ active }) {
        this.setState({
            active
        })
    }

    render() {
        const {
            content,
            position,
            trigger,
            children
        } = this.props;

        const {
            active
        } = this.state;

        const _content = (
            <div
                className={`z-tooltip__content
                z-tooltip__content--${position}`}>
                {content}
            </div>
        )

        return (
            <Popup
                content={_content}
                position={`${position}-center`}
                trigger={trigger}
            >
                {children}
            </Popup>
        )
    }
}

Tooltip.propTypes = {
    content: PropTypes.any,
    position: PropTypes.oneOf(['bottom', 'top', 'left', 'right']),
    trigger: PropTypes.oneOf(['hover', 'focus'])
}

Tooltip.defaultProps = {
    position: 'top',
    trigger: 'hover'
}