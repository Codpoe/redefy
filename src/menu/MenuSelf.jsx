import React from 'react';
import PropTypes from 'prop-types';

import Menu from './Menu.jsx';

export default class MenuSelf extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value || ''
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect({ value }) {
        this.setState({
            value
        })
    }

    render() {
        const {
            value
        } = this.state;

        return (
            <Menu {...this.props}
                value={value}
                onSelect={this.handleSelect}
            >
            </Menu>
        )
    }
}

MenuSelf.propTypes = {
    indicatorPosition: PropTypes.oneOf(['left', 'right', 'both']),
    value: PropTypes.string,
    defaultOpen: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    menuWidth: PropTypes.string
};

MenuSelf.defaultProps = {
    indicatorPosition: 'left',
    defaultOpen: []
}