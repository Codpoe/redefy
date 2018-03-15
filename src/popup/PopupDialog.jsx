import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/';

import './popup-dialog.css';

export default class PopupDialog extends React.Component {
    constructor(props) {
        super(props);
    }

    handleCancel = () => {
        const { popup } = this.context;
        const { onCancel } = this.props;

        popup && popup.hide();
        onCancel && onCancel();
    }

    handleConfirm = () => {
        const { popup } = this.context;
        const { onConfirm } = this.props;

        popup && popup.hide();
        onConfirm && onConfirm();
    }

    render() {
        const {
            title,
            type,
            children,
            confirmText,
            cancelText,
            onCancel,
            onConfirm
        } = this.props;

        return (
            <div className="popup-dialog">
                <h1 className="popup-dialog__header">{title}</h1>
                <p className="popup-dialog__body">{children}</p>
                <div className="popup-dialog__footer">
                    <Button className="popup-dialog__confirm-btn" type={type} size="small" onClick={this.handleConfirm}>
                        {confirmText}
                    </Button>    
                    <Button className="popup-dialog__cancel-btn" size="small" outline onClick={this.handleCancel}>
                        {cancelText}
                    </Button>
                </div>
            </div>
        )
    }
}

PopupDialog.contextTypes = {
    popup: PropTypes.any
};

PopupDialog.propTypes = {
    type: PropTypes.oneOf(['primary', 'success', 'warning', 'error']),
    confirmText: PropTypes.string,
    cancelText: PropTypes.string
};

PopupDialog.defaultProps = {
    type: 'primary',
    confirmText: '确认',
    cancelText: '取消'
}