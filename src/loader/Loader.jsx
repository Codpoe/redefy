import React from 'react';
import PropTypes from 'prop-types';

import './loader.css';

export default class Loader extends React.Component {

    renderWrapper() {
        const {
            loading,
            children
        } = this.props;

        return (
            <div className="my-loader-wrapper">
                {children}
                {loading && this.renderLoader()}
            </div>
        )
    }

    renderLoader() {
        const {
            size,
            color,
            className,
            style
        } = this.props;

        return (
            <div
                className={`
                    my-loader
                    my-loader--${size}
                    ${className}
                `}
                style={style}
            >
                <div
                    className="my-loader__1"
                    style={{
                        borderColor: color
                    }}
                >
                </div>

                <div
                    className="my-loader__2"
                    style={{
                        borderColor: color
                    }}
                >
                </div>
            </div>
        )
    }

    render() {
        const {
            color,
            children,
            className,
            style
        } = this.props;

        if (children) {
            return this.renderWrapper();
        }

        return this.renderLoader();
    }        
}

Loader.propTypes = {
    loading: PropTypes.bool,
    size: PropTypes.oneOf(['small', 'normal', 'large']),
    delay: PropTypes.number,
    color: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
};

Loader.defaultProps = {
    size: 'normal',
    color: '',
    className: '',
    style: {}
};