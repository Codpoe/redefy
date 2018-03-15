import React from 'react';
import PropTypes from 'prop-types';

import Popup from './Popup.jsx';

export default class PopupSelf extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            active: props.active || false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ active }) {
        this.setState({
            active
        });
    }

    render() {
        const {
            active
        } = this.state;

        return (
            <Popup {...this.props}
                active={active}
                onChange={this.handleChange}
            >
            </Popup>
        )
    }
}

PopupSelf.propTypes = {
    content: PropTypes.any,
    trigger: PropTypes.oneOf(['hover', 'click', 'focus']),
    hideOnClick: PropTypes.bool,
    position: PropTypes.oneOf([
        'bottom-left', 'bottom-center', 'bottom-right',
        'top-left', 'top-center', 'top-right',
        'left-top', 'left-center', 'left-bottom',
        'right-top', 'right-center', 'right-bottom'
    ])
};

PopupSelf.defaultProps = {
    trigger: 'hover',
    hideOnClick: false,
    position: 'bottom-left'
}

