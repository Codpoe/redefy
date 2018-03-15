import React from 'react';
import PropTypes from 'prop-types';

import './sticky.css';

export default class Sticky extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sticky: false
        };
    }

    componentDidMount() {
        const { offset, onChange } = this.props;
        let rect = this.stickyRef.getBoundingClientRect();
        this.top = rect.top + this.getScrollOffset().y - Number(offset);
        this.left = rect.left + this.getScrollOffset().x;

        window.addEventListener('scroll', ev => {
            if (this.getScrollOffset().y > this.top) {
                if (this.state.sticky) {
                    return;
                }

                this.setState({
                    sticky: true
                });
                onChange && onChange({ sticky: true });
            } else {
                if (!this.state.sticky) {
                    return;
                }

                this.setState({
                    sticky: false
                });
                onChange && onChange({ sticky: false });
            }
        })
    }

    getScrollOffset() {
        const w = window;
        const d = w.document;

        if (w.pageXOffset != null) {
            return {
                x: w.pageXOffset,
                y: w.pageYOffset
            };
        }

        if (document.compatMode == "CSS1Compat") {
            return {
                x: d.documentElement.scrollLeft,
                y: d.documentElement.scrollTop
            };
        }

        return {
            x: d.body.scrollLeft,
            y: d.body.scrollTop
        };
    }

    render() {
        const {
            offset,
            className,
            style,
            children
        } = this.props;
        const {
            sticky
        } = this.state;

        return (
            <div
                ref={el => this.stickyRef = el}
                className={`z-sticky
                ${sticky ? 'z-sticky--active' : ''}
                ${className}`}
                style={sticky ? Object.assign({}, style, {
                    position: 'fixed',
                    top: `${offset}px`,
                    left: `${this.left}px`,
                    zIndex: '999'
                }) : style}
            >
                {children}
            </div>
        )
    }
}

Sticky.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func
}

Sticky.defaultProps = {
    className: '',
    style: {},
    offset: 0
}