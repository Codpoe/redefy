import React from 'react';
import PropTypes from 'prop-types';

import Form from '../form/';
import Input from '../input/';
import './pagination.css';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                jumperValue: ''
            }
        };
        this.validators = {
            jumperValue: [{
                customRule(value) {
                    if (!value) {
                        return;
                    }
                    value = parseInt(value, 10);
                    if (!value || value < 1 || value > props.total) {
                        return `1 ~ ${props.total}`;
                    }
                }
            }]
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleJumperChange = this.handleJumperChange.bind(this);
        this.handleJumperSubmit = this.handleJumperSubmit.bind(this);
    }

    handleClick(ev) {
        const { onChange } = this.props;
        const index = Number(ev.target.dataset.index);

        if (!index) {
            return;
        }

        onChange && onChange(index);
    }

    handlePrevNextClick(type = 'prev', ev) {
        const { total, value, onChange } = this.props;
        let index;
        
        if (type === 'prev') {
            if (value === 1) {
                return;
            }
            index = Math.max(value - 1, 1);
        } else {
            if (value === total) {
                return;
            }
            index = Math.min(value + 1, total);
        }

        onChange && onChange(index);
    }

    handleJumperChange({ value }, ev) {
        const { form } = this.state;

        this.setState({
            form: Object.assign(form, { jumperValue: value })
        });
    }

    handleJumperSubmit({ valid }, ev) {
        const { onChange } = this.props;
        const { form } = this.state;
        let value;

        if (!valid || !form.jumperValue) {
            return;
        }

        value = parseInt(form.jumperValue, 10);
        this.setState({
            form: Object.assign(form, { jumperValue: '' })
        });

        onChange && onChange(value);
    }

    calcPages(total, current) {
        let pages = [];
        let firstPage;
        let lastPage;
        let centerPages;
        let leftMorePage;
        let rightMorePage;
        let startIndex;
        let endIndex;

        if (total <= 7) {
            pages = new Array(total).fill(0).map((item, index) => {
                return this.renderItem(current, index + 1);
            });
        } else {
            let morePage = (
                <li className="my-pagination__more">
                    <i className="icon icon-more-horizontal"></i>
                </li>
            );

            if (current - 3 <= 1) {
                startIndex = 1;
                endIndex = 5;
            } else {
                startIndex = current - 1;
                firstPage = this.renderItem(current, 1);
                leftMorePage = this.renderMoreItem('left');
            }

            if (current + 3 >= total) {
                startIndex = total - 4;
                endIndex = total;
            } else {
                endIndex = endIndex || current + 1;
                lastPage = this.renderItem(current, total);
                rightMorePage = this.renderMoreItem('right');;
            }

            centerPages = new Array(endIndex - startIndex + 1).fill(0).map((item, index) => {
                return this.renderItem(current, index + startIndex);
            })

            pages = pages.concat(firstPage, leftMorePage, centerPages, rightMorePage, lastPage);
        }

        return pages;
    }

    renderItem(current, index) {
        return (
            <li
                key={index}    
                className={`
                    my-pagination__item
                    ${index === current ? 'my-pagination__item--active' : ''}
                `}
                data-index={index}
            >
                {index}
            </li>
        );
    }

    renderMoreItem(side = 'left') {
        return (
            <li key={side} className="my-pagination__more">
                <i className="icon icon-more-horizontal"></i>
            </li>
        )
    }

    render() {
        const {
            total,
            value,
            quickJump,
            className,
            style
        } = this.props;

        const {
            form
        } = this.state;

        const items = this.calcPages(total, value);

        return (
            <ul
                className={`
                    my-pagination
                    ${className}
                `}
                style={style}
                onClick={this.handleClick}
            >
                <li
                    className={`
                        my-pagination__prev
                        ${value === 1 ? 'my-pagination__prev--disabled' : ''}
                    `}
                    onClick={this.handlePrevNextClick.bind(this, 'prev')}
                >
                    <i className="icon icon-chevron-left"></i>
                </li>
                {items}
                <li
                    className={`
                        my-pagination__next
                        ${value === total ? 'my-pagination__next--disabled' : ''}
                    `}
                    onClick={this.handlePrevNextClick.bind(this, 'next')}
                >
                    <i className="icon icon-chevron-right"></i>
                </li>
                
                {quickJump && (
                    <li className="my-pagination__jumper">
                        <Form
                            value={form}
                            validators={this.validators}
                            onSubmit={this.handleJumperSubmit}
                            labelWidth={60}
                            labelHeight={30}
                        >
                            <Form.Item label="Goto" propName="jumperValue">
                                <Input
                                    value={form.jumperValue}
                                    onChange={this.handleJumperChange}
                                    size="small"
                                    outline
                                    style={{ width: '50px' }}
                                />
                            </Form.Item>
                        </Form>    
                    </li>
                )}
            </ul>
        )
    }
}

Pagination.propTypes = {
    total: PropTypes.number,
    value: PropTypes.number,
    quickJump: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
}

Pagination.defaultProps = {
    value: 1,
    quickJump: false
}