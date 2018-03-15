import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import './dialog.css';

export default class Dialog extends React.Component {
    constructor(props) {
        super(props);

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.node = document.getElementById('dialog-root');

        if (!this.node) {
            this.node = document.createElement('div');
            this.node.id = 'dialog-root';
            document.body.appendChild(this.node);
        }
    }

    getChildContext() {
        return {
            dialog: this
        };
    }

    handleOk() {
        const { onOk } = this.props;
        onOk && onOk();
    }

    handleCancel() {
        const { onCancel } = this.props;
        onCancel && onCancel();
    }

    render() {
        const {
            visible,
            children,
            className,
            style
        } = this.props;

        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return ReactDOM.createPortal(
            <CSSTransition
                classNames="my-dialog"
                in={visible}
                timeout={{
                    exit: 400
                }}
            >
                <div className={`my-dialog`}>
                    <div className="my-dialog__mask" onClick={this.handleCancel}></div>
                    <div className={`my-dialog__content ${className}`} style={style}>
                        {children}
                    </div>
                </div>
            </CSSTransition>
            ,
            this.node
        )
    }
};

Dialog.childContextTypes = {
    dialog: PropTypes.any
};

Dialog.propTypes = {
    visible: PropTypes.bool,
    okType: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
    cancelType: PropTypes.oneOf(['default', 'primary', 'success', 'warning', 'error']),
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
};

Dialog.defaultProps = {
    visible: false,
    okType: 'primary',
    cancelType: 'default',
    okText: '确认',
    cancelText: '取消',
    className: '',
    style: {}
};