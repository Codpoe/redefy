import React from 'react';
import PropTypes from 'prop-types';
import index from '../form/index';

import Pagination from '../pagination/';
import Filter from './Filter.jsx';
import Checkbox from '../checkbox/';
import './table.css';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.filterData(this.sortData(props.data)),
            page: 1
        };
        this.handleFilter = this.handleFilter.bind(this);
        this.handlePage = this.handlePage.bind(this);

        console.log(this.state.data);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: this.filterData(this.sortData(nextProps.data)),
            page: 1
        });
    }

    handleSort(value) {
        const { columns, sorters, onSort } = this.props;

        for (let key in sorters.use) {
            if (sorters.use[key] === value[key]) {
                value = {};
            }
        }

        onSort && onSort({ sorters: Object.assign(sorters, { use: value }) });
    }

    handleFilter(value) {
        const { filters, onFilter } = this.props;
        const _use = Object.assign(filters.use || {}, value);
        onFilter && onFilter({ filters: Object.assign(filters, { use: _use }) });
    }

    handlePage({ value }) {
        this.setState({
            page: value
        });
    }

    sortData(data) {
        const { sorters } = this.props;
        let result = data.slice();

        for (let key in sorters.use) {
            switch (sorters.use[key]) {
                case 'ascend':
                    result = result.sort(sorters[key]);
                    break;
                case 'descend':
                    result = result.sort(sorters[key]);
                    result.reverse();
                    break;
                default:
                    break;    
            }
        }

        return result;
    }

    filterData(data) {
        const { filters } = this.props;
        let result = data.slice();

        for (let key in filters.use) {
            if (filters.use[key].length === 0) {
                continue;
            }

            const _method = (row) => {
                return filters[key].method(row, filters.use[key]);
            };
            result = result.filter(_method);
        }

        return result;
    }

    renderColumns() {
        const { columns, sorters, filters } = this.props;
        
        return (
            <tr className="my-table__row">
                {columns.map(({ label, prop, render, width, align }) => {
                    return (
                        <th
                            key={prop || label}
                            className={`
                                my-table__column
                                ${(sorters.use && sorters.use[prop])
                                    ? `my-table__column--${sorters.use[prop]}`
                                    : ''
                                }
                                ${(filters.use && filters.use[prop] && filters.use[prop].length > 0)
                                    ? `my-table__column--filtering`
                                    : ''
                                }
                            `}
                            style={{
                                width: width || 'normal',
                                textAlign: align
                            }}
                        >
                            {label}
                            {sorters[prop] && (
                                <span style={{
                                    marginLeft: '6px',
                                    userSelect: 'none'
                                }}>
                                    <i
                                        className="icon icon-chevrons-up"
                                        onClick={this.handleSort.bind(this, { [prop]: 'ascend' })}
                                    ></i>
                                    <i
                                        className="icon icon-chevrons-down"
                                        onClick={this.handleSort.bind(this, { [prop]: 'descend' })}
                                    ></i>
                                </span>
                            )}
                            {filters[prop] && (
                                <span style={{
                                    marginLeft: '6px',
                                    userSelect: 'none'
                                }}>
                                    <Filter prop={prop} options={filters[prop].options}
                                        onFilter={this.handleFilter}
                                    >
                                    </Filter>
                                </span>
                            )}
                        </th>
                    );
                })}
            </tr>
        )    
    }

    renderRows() {
        const { columns, keyProp, perPage } = this.props;
        const { data, page } = this.state;
        let _data = data.slice();

        if (perPage) {
            _data = data.slice(perPage * (page - 1), perPage * page);
        }

        return _data.map((row, index) => {
            return (
                <tr key={keyProp ? row[keyProp] : index} className="my-table__row">
                    {this.renderCells(row)}
                </tr>
            )
        })
    }

    renderCells(row) {
        const { columns } = this.props;

        return columns.map(({ label, prop, align, render }, index) => {
            return (
                <td
                    key={prop || label}
                    className="my-table__cell"
                    style={{
                        textAlign: align
                    }}
                >
                    {typeof render === 'function'
                        ? render(row)
                        : (row[prop])
                    }
                </td>
            );
        });
    }

    render() {
        const {
            columns,
            data,
            perPage,
            empty,
            onSelect,
            onSelectAll,
            className,
            style
        } = this.props;
        const {
            data: _data,
            page
        } = this.state;

        return (
            <div className="my-table-wrapper">
                <table
                    className={`
                        my-table
                        ${className}
                    `}
                >
                    <thead className="my-table__head">
                        {this.renderColumns()}
                    </thead>

                    <tbody className="my-table__body">
                        {this.renderRows()}
                    </tbody>
                </table>
                {_data.length > 0 && perPage && (
                    <Pagination   
                        total={Math.ceil(_data.length / perPage)}
                        value={page}
                        onChange={this.handlePage}
                        style={{
                            float: 'right',
                            marginTop: '14px'
                        }}
                    />
                )}
                {_data.length === 0 && (
                    <div className="my-table__empty">
                        {empty ? { empty } : (
                            <span className="my-table__empty-content"><i className="icon icon-info"></i>暂无数据</span>
                        )}
                    </div>
                )}
            </div>    
        )
    }
}

Table.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array,
    keyProp: PropTypes.string,
    sorters: PropTypes.shape({
        use: PropTypes.object,
        prop: PropTypes.string,
        order: PropTypes.oneOf(['ascend', 'descend'])
    }),
    filters: PropTypes.shape({
        use: PropTypes.object,
        props: PropTypes.array,
    }),
    perPage: PropTypes.number,
    empty: PropTypes.any,
    onSort: PropTypes.func,
    onFilter: PropTypes.func
};

Table.defaultProps = {
    sorters: {
        use: {}
    },
    filters: {
        use: {}
    }
};

/**
 * columns
 * [{
 *      label: '',
 *      prop: '',
 *      width: '',
 *      align: '',
 *      sorter: func,
 *      filter: func,
 *      filterOptions: [{label, value}]
 * }]
 * 
 * or
 * 
 * [{
 *      label: '',
 *      prop: '',
 *      render: (value, row) => ()
 * }]
 * 
 * 
 * data
 * [{prop1, prop2}, {prop1, prop2}]
 * 
 * 
 * sorter
 * {
 *      prop1: (a, b) => {},
 *      prop2: (a, b) => {},
 *      prop: '',
 *      order: 'ascend' or 'descend'
 * }
 * 
 * 
 * filter
 * {
 *      prop1: func,
 *      prop2: func,
 *      use: {
 *          prop1: ['a', 'b'],
 *          prop2: ['x', 'y']
 *      }
 * }
 */