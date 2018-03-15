import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../popup/';
import Checkbox from '../checkbox/';
import Radio from '../radio/';
import Button from '../button/';

import './filter.css';

export default class Filter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: props.multiple ? [] : ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUnset = this.handleUnset.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleChange({ value }) {
        this.setState({
            checked: value
        });
    }

    handleUnset() {
        const { multiple } = this.props;
        this.setState({
            checked: multiple ? [] : ''
        });
    }

    handleFilter() {
        const { prop, onFilter } = this.props;
        const { checked } = this.state;

        this.popupRef.hide();
        onFilter && onFilter({ [prop]: checked });
    }

    renderContent() {
        const { prop, options, multiple } = this.props;
        const { checked } = this.state;
        let Node;

        if (multiple) {
            Node = Checkbox;
        } else {
            Node = Radio;
        }

        return (
            <div className="my-table__filter__content">
                <Node.Group
                    value={checked}
                    onChange={this.handleChange}
                    style={{
                        display: 'flex',
                        flexDiraction: 'column',
                        alignItems: 'stretch',
                        minWidth: '100px',
                        margin: '0 14px'
                    }}
                >
                    {options.map(({ value, label }, index) => (
                        <Node
                            key={value}
                            value={value}
                            style={{
                                height: '32px',
                                width: '100%',
                                paddingRight: '0'
                            }}
                        >
                            {label || value}
                        </Node>
                    ))}
                </Node.Group>
                
                <div className="my-table__filter__actions">
                    <Button
                        flat
                        size="small"
                        onClick={this.handleUnset}
                    >
                        重置
                    </Button>
                    <Button
                        type="primary"
                        flat
                        size="small"
                        onClick={this.handleFilter}
                    >
                        筛选
                    </Button>
                </div>
            </div>
        )
    }

    render() {
        const {
            options
        } = this.props;

        return (
            <Popup
                ref={ref => this.popupRef = ref}    
                content={this.renderContent()}
                position="top-right"
                trigger='click'
            >
                <i className="icon icon-filter"></i>    
            </Popup>
        )
    }
}

Filter.contextTypes = {
    popup: PropTypes.any
}