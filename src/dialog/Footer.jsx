import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/';

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleOk() {
        const { dialog } = this.context;
        dialog && dialog.handleOk();
    }

    handleCancel() {
        const { dialog } = this.context;
        dialog && dialog.handleCancel();
    }

    render() {
        const {
            children,
            className,
            style
        } = this.props;

        const { dialog: { props: {
            okText,
            okType,
            cancelText,
            cancelType
        } } } = this.context;
        
        if (children) {
            return children;
        }

        return (
            <div
                className={`my-dialog__footer ${className}`}
                style={style}
            >
                <Button    
                    outline    
                    type={cancelType}
                    onClick={this.handleCancel}
                    style={{ marginRight: '8px' }}
                >
                    {cancelText}    
                </Button>
                <Button
                    type={okType}
                    onClick={this.handleOk}
                >
                    {okText}
                </Button>
            </div>
        );
    }
}

Footer.contextTypes = {
    dialog: PropTypes.any
};

Footer.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object
};

Footer.defaultProps = {
    className: '',
    style: {}
};

export default Footer;