import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './toast.css';

const icons = {
    info: (<i className="icon icon-info"></i>),
    success: (<i className="icon icon-success"></i>),
    warning: (<i className="icon icon-warning"></i>),
    error: (<i className="icon icon-danger"></i>)
}

const toastRoot = document.getElementById('toast-root');

export default class Toast extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            visible: false
        };
    }

    componentDidMount() {
        const { duration } = this.props;

        setTimeout(() => {
            this.setState({
                visible: true
            });
        }, 100);

        setTimeout(() => {
            this.setState({
                visible: false
            });
        }, duration);
    }

    handleExited = () => {
        const { mountNode } = this.props;

        ReactDOM.unmountComponentAtNode(mountNode);
        document.body.removeChild(mountNode);
    }

    getIconClass(type) {
        switch (type) {
            case 'info':
                return 'info';
            case 'success':
                return 'check-circle';
            case 'warning':
                return 'alert-circle';
            case 'error':
                return 'x-circle';
        }
    }

    render() {
        const {
            type,
            icon,
            duration,
            children,
        } = this.props;
        const {
            visible
        } = this.state;

        return (
            <CSSTransition    
                classNames="toast"
                timeout={duration + 500}
                in={visible}
                onExited={this.handleExited}
            >
                <div className="my-toast">
                    {icon ? icon : (
                        <i className={`icon icon-${this.getIconClass(type)}`}></i>    
                    )}
                    <span>{children}</span>
                </div>
            </CSSTransition>
        )
    }
}

Toast.propTypes = {
    type: PropTypes.oneOf(['info', 'success', 'warning', 'error']),
    duration: PropTypes.number
};

Toast.defaultProps = {
    type: 'info',
    duration: 3000
};

Toast.show = (text, props) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const toast = (<Toast {...props} mountNode={div}>{text}</Toast>)

    ReactDOM.render(toast, div);
}

['info', 'success', 'warning', 'error'].forEach(type => {
    Toast[type] = (text, props = {}) => {
        Toast.show(text, Object.assign(props, { type }));
    }
})