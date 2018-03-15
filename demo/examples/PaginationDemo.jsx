import React from 'react';

import Pagination from '../../src/pagination/';

export default class PaginationDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value1: 1,
            value2: 1,
            value3: 1
        };
    }

    handleChange(i, { value }) {
        this.setState({
            [`value${i}`]: value
        });
    }
    
    render() {
        const {
            value1,
            value2,
            value3
        } = this.state;

        return (
            <div>
                <h1>Pagination</h1>
                <br />
                <h3>{'< 8'}</h3>
                <br/>
                <Pagination
                    total={7}
                    value={value1}
                    onChange={this.handleChange.bind(this, 1)} />
                <br />
                <h3>{'>= 8'}</h3>
                <br />
                <Pagination
                    total={50}
                    value={value2}
                    onChange={this.handleChange.bind(this, 2)}
                />
                <br/>
                <h3>quickJump</h3>
                <br/>
                <Pagination
                    total={50}
                    value={value3}
                    quickJump
                    onChange={this.handleChange.bind(this, 3)}
                />
            </div>    
        )
    }
}