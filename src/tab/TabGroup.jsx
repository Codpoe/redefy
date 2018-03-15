import React from 'react';
import PropTypes from 'prop-types';

export default class TabGroup extends React.Component {
    constructor(props) {
        super(props);
    }

    getChildContext() {
        return {
            tabGroup: this
        };
    }

    handleChange() {
        
    }

    render() {
        const {
            value,
            className,
            style
        } = this.props;

        return (
            <div
                className={`
                    my-tab-group
                    ${className}
                `}
                style={style}
            >

            </div>
        )
    }
}

TabGroup.childContentTypes = {
    tabGroup: PropTypes.any
}