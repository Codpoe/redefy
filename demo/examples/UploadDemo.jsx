import React from 'react';

import Upload from '../../src/upload/';
import Button from '../../src/button/';

export default class UploadDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange({ files }) {
        this.setState({
            files
        });
    }

    render() {
        const {
            files
        } = this.state;

        return (
            <div>
                <h1>Upload</h1>
                <br/>
                <Upload
                    accept="image/png,image/jpeg"    
                    files={files}
                    onChange={this.handleChange}
                >
                    <Button type="primary">上传文件</Button>    
                </Upload>
                <br/>
            </div>
        )
    }
}