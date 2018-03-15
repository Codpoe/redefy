import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import index from '../form/index';

import Filter from './Filter.jsx';
import Checkbox from '../checkbox/';
import './table.css';

export default class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted: {},
            filtered: {},
            selections: [],
            expanded: []
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleSort(value) {
        const { columns, onSort } = this.props;
        const { sorted } = this.state;
        let newSorted;
        
        for (let key in sorted) {
            if (sorted[key] === value[key]) {
                value[key] = '';
            }
        }
        newSorted = { ...sorted, ...value };

        this.setState({
            sorted: newSorted
        });

        onSort && onSort({ value: newSorted });
    }

    handleFilter(value) {
        const { onFilter } = this.props;
        const { filtered } = this.state;
        let newFiltered = { ...filtered, ...value };

        this.setState({
            filtered: newFiltered
        });
        onFilter && onFilter({ value: newFiltered });
    }

    handleSelectChange = ({ value, checked }) => {
        const { onSelect } = this.props;
        const { selections } = this.state;
        let _selections = selections.slice();

        if (!checked) {
            _selections.splice(_selections.indexOf(value), 1);
        } else {
            _selections.push(value);
        }

        this.setState({
            selections: _selections
        });
        onSelect && onSelect(_selections);
    }

    handleSelectAll = ({ value, checked }) => {
        const { selectable, onSelect } = this.props;
        let _selections;
        
        if (!checked) {
            _selections = [];
        } else if (typeof selectable === 'boolean') {
            _selections = value.slice();
        } else if (typeof selectable === 'function') {
            _selections = value.filter(selectable);
        }

        this.setState({
            selections: _selections
        });
        onSelect && onSelect(_selections);
    }

    handleExpandClick = (ev) => {
        let { index } = ev.target.dataset;
        index = Number(index);
        const { expanded } = this.state;
        const i = expanded.indexOf(index);
        let _expanded = expanded.slice();

        if (i === -1) {
            _expanded.push(index);
        } else {
            _expanded.splice(i, 1);
        }

        this.setState({
            expanded: _expanded
        });
    }

    renderColumns() {
        const { columns, data, selectable, expandRender } = this.props;
        const { sorted, filtered, selections } = this.state;
        let selectableData;

        if (typeof selectable === 'boolean') {
            selectableData = data;
        } else if (typeof selectable === 'function') {
            selectableData = data.filter((row, index) => selectable(row, index));
        }

        return (
            <tr className="my-table__row">
                {expandRender && (
                    <th className="my-table__column"></th>
                )}
                {selectable && (
                    <th className="my-table__column">
                        <Checkbox
                            value={selectableData}
                            checked={this.isSelectAll(selectableData)}
                            onChange={this.handleSelectAll}
                            disabled={data.length === 0}
                            className="my-table__checkbox"
                        />
                    </th>
                )}
                {columns.map(({ label, prop, render, width, align, sortable, filters, multiple = true }) => {
                    return (
                        <th
                            key={prop || label}
                            className={`
                                my-table__column
                                ${sorted[prop]
                                    ? `my-table__column--${sorted[prop]}`
                                    : ''
                                }
                                ${(multiple ?
                                    (filtered[prop] && filtered[prop].length > 0) :
                                    (filtered[prop])
                                )
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
                            {sortable && (
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
                            {filters && filters.length > 0 && (
                                <span style={{
                                    marginLeft: '6px',
                                    userSelect: 'none'
                                }}>
                                    <Filter
                                        prop={prop}
                                        options={filters}
                                        multiple={multiple}
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
        const { columns, data, keyProp, selectable, expandRender } = this.props;
        const { selections, expanded } = this.state;
        let rows = [];

        data.forEach((row, index) => {
            let rowSelectable;
            let rowExpanded = false;

            if (typeof selectable === 'boolean') {
                rowSelectable = selectable;
            } else if (typeof selectable === 'function') {
                rowSelectable = selectable(row, index);
            }

            if (expanded.includes(index)) {
                rowExpanded = true;
            }

            rows.push(
                <tr key={keyProp ? row[keyProp] : index} className="my-table__row">
                    {expandRender && (
                        <td
                            className="my-table__cell"
                        >
                            <div
                                className={`
                                    my-table__cell--expandable
                                    ${rowExpanded ? 'my-table__cell--expanded' : ''}
                                `}
                            >
                                <i
                                    className="icon icon-chevron-right"
                                    data-index={index}
                                    onClick={this.handleExpandClick}
                                >
                                </i>
                            </div>    
                        </td>
                    )}
                    {selectable && (
                        <td className="my-table__cell">
                            <Checkbox
                                value={row}
                                checked={rowSelectable && selections.includes(row)}
                                disabled={!rowSelectable}
                                onChange={this.handleSelectChange}
                                className="my-table__checkbox"
                            />
                        </td>
                    )}
                    {this.renderCells(row)}
                </tr>
            );
            if (rowExpanded) {
                rows.push(
                    <tr
                        key={keyProp ? `${row[keyProp]}-expand` : `${index}-expand`}
                        className="my-table__row my-table__expand-row"
                    >
                        <td className="my-table__cell"></td>
                        <td className="my-table__cell" colSpan={columns.length}>
                            {expandRender(row, index)}
                        </td>
                    </tr>
                );
            }
        });

        return rows;

        /*
        return data.map((row, index) => {
            let rowSelectable;

            if (typeof selectable === 'boolean') {
                rowSelectable = selectable;
            } else if (typeof selectable === 'function') {
                rowSelectable = selectable(row, index);
            }

            return (
                <tr key={keyProp ? row[keyProp] : index} className="my-table__row">
                    {selectable &&  (
                        <td className="my-table__cell">
                            <Checkbox
                                value={row}
                                checked={rowSelectable && selections.includes(row)}
                                disabled={!rowSelectable}
                                onChange={this.handleSelectChange}
                                className="my-table__checkbox"
                            />
                        </td>
                    )}
                    {this.renderCells(row)}
                </tr>
            )
        })
        */
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
                        ? render(row, index)
                        : (row[prop])
                    }
                </td>
            );
        });
    }

    isSelectAll(selectableData) {
        const { selections } = this.state;
        
        if (selectableData.length === 0) {
            return false;
        }

        return selectableData.every(row => selections.includes(row));
    }

    render() {
        const {
            columns,
            data,
            empty,
            className,
            style
        } = this.props;

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

                {data.length === 0 && (
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
    sorterable: PropTypes.bool,
    filters: PropTypes.array,
    selectable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    empty: PropTypes.any,
    onSort: PropTypes.func,
    onFilter: PropTypes.func,
    onSelect: PropTypes.func,
    onSelectAll: PropTypes.func
};