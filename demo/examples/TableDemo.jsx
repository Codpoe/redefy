import React from 'react';

import Table from '../../src/table/';
import Pagination from '../../src/pagination/';

export default class TableDemo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [
                {
                    firstName: 'Lei',
                    lastName: 'Li'
                },
                {
                    firstName: 'Meimei',
                    lastName: 'Han'
                },
                {
                    firstName: 'Ling',
                    lastName: 'Bai'
                },
                {
                    firstName: 'Yifan',
                    lastName: 'Wu'
                },
                {
                    firstName: 'Bai',
                    lastName: 'Li'
                },
                {
                    firstName: 'Fu',
                    lastName: 'Du'
                },
                {
                    firstName: 'Juyi',
                    lastName: 'Bai'
                }
            ],
            sorters: {
                firstName: ({ firstName: a }, { firstName: b }) => {
                    if (a > b) {
                        return 1;
                    } else if (a < b) {
                        return -1;
                    } else {
                        return 0;
                    }
                }
            },
            filters: {
                lastName: {
                    options: [{ value: 'a' }, { value: 'b' }],
                    method: ({ lastName }, checked) => {
                        return checked.some(item => {
                            return lastName.indexOf(item) > -1;
                        });
                    }
                }
            }
        }
        this.columns = [
            {
                label: 'First Name',
                prop: 'firstName',
                width: 180
            },
            {
                label: 'Last Name',
                prop: 'lastName',
                width: 180
            },
            {
                label: 'Action',
                render: row => (
                    <span>
                        <a href="">{row.firstName}</a>&nbsp;|&nbsp;
                        <a href="">{row.lastName}</a>
                    </span>
                )
            }
        ]
        
        this.handleSort = this.handleSort.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleSort({ sorters }) {
        this.setState({
            sorters
        });
    }

    handleFilter({ filters }) {
        this.setState({
            filters
        });
    }

    render() {
        const {
            data,
            sorters,
            filters
        } = this.state;

        return (
            <div>
                <br />
                <h1>Table</h1>
                <br />
                <Table
                    columns={this.columns}
                    data={data}
                    sorters={sorters}
                    filters={filters}
                    perPage={3}
                    onSort={this.handleSort}
                    onFilter={this.handleFilter}
                />
                <br />
            </div>
        )
    }
}