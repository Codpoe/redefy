import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../popup/';
import Button from '../button/';

import './pop-dialog.css';

export default class PopDialog extends React.Component {
    
    handleOk = () => {
        const { onOk } = this.props;
        this.popupRef.hide();
        onOk && onOk();
    }

    handleCancel = () => {
        const { onCancel } = this.props;
        this.popupRef.hide();
        onCancel && onCancel();
    }

    renderContent() {
        const {
            title,
            body,
            okText,
            cancelText,
            onOk,
            onCancel
        } = this.props;

        return (
            <div className="pop-dialog">
                {title && (
                    <div className="pop-dialog__header">{title}</div>
                )}    
                <div className="pop-dialog__body">{body}</div>
                <div className="pop-dialog__footer">
                    <Button outline size="small" style={{ marginRight: '8px' }} onClick={this.handleCancel}>
                        {cancelText}
                    </Button>
                    <Button type="primary" size="small" onClick={this.handleOk}>
                        {okText}
                    </Button>
                </div>
            </div>    
        )
    }

    render() {
        const {
            trigger,
            position,
            children
        } = this.props;

        return (
            <Popup
                ref={el => this.popupRef = el}    
                content={this.renderContent()}
                trigger={trigger}
                position={position}
            >
                {children}    
            </Popup>
        )
    }
}

PopDialog.propTypes = {
    position: PropTypes.oneOf([
        'bottom-left', 'bottom-center', 'bottom-right',
        'top-left', 'top-center', 'top-right',
        'left-top', 'left-center', 'left-bottom',
        'right-top', 'right-center', 'right-bottom'
    ]),
    trigger: PropTypes.oneOf(['hover', 'click', 'focus']),
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onOk: PropTypes.func,
    onCancel: PropTypes.func
}

PopDialog.defaultProps = {
    position: 'top-right',
    trigger: 'click',
    okText: '确认',
    cancelText: '取消'
}