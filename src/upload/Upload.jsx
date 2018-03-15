import React from 'react';
import PropTypes from 'prop-types';

import './upload.css';

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(ev) {
        this.inputRef.click();
    }

    handleChange(ev) {
        const { files, onChange } = this.props;
        const { files: evFiles } = ev.target;
        let _files = files.slice();

        for (let i = 0; i < evFiles.length; i++) {
            _files.push(evFiles[i]);
        }

        onChange && onChange({ files: _files });
    }

    handleDelete(index, ev) {
        const { files, onChange } = this.props;
        let _files = files.slice();
        _files.splice(index, 1);

        onChange && onChange({ files: _files });
    }

    getFileLogo(fileType) {
        const type = fileType.split('/')[0];
        let logo;

        switch (type) {
            case 'image':
                logo = 'image';
                break;
            case 'video':
                logo = 'video';
                break;
            case 'audio':
                logo = 'music';
                break;
            case 'text':
                logo = 'file-text';
                break;
            default:
                logo = 'file';    
        }

        return logo;
    }

    render() {
        const {
            files,
            accept,
            multiple,
            children
        } = this.props;

        return (
            <div className={`my-upload`}>
                <input
                    ref={ref => this.inputRef = ref}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={this.handleChange}
                    style={{
                        display: 'none'
                    }}
                />
                
                <span
                    className="my-upload__trigger"
                    onClick={this.handleClick}
                >
                    {children}
                </span>

                <div className="my-upload__list">
                    {files.map(({ name, size, type }, index) => (
                        <div
                            key={index}
                            className="my-upload__item"
                        >
                            <span className="my-upload__name">
                                <i className={`icon icon-${this.getFileLogo(type)}`}></i>    
                                {name}
                            </span>
                            <i className="icon icon-x" onClick={this.handleDelete.bind(this, index)}></i>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

Upload.propTypes = {
    files: PropTypes.array,
    accept: PropTypes.string,
    multiple: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    onChange: PropTypes.func
};

Upload.defaultProps = {
    files: [],
    multiple: false
};