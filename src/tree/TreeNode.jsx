import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

export default class TreeNode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    handleIndicatorClick = () => {
        const { onIndicatorClick } = this.context.tree;
        const { children } = this.props;
        const { expanded } = this.state;

        if (!children) {
            return;
        }

        this.setState({
            expanded: !expanded
        });
    }

    handleNodeClick = () => {
        const { onNodeClick } = this.context.tree.props;
        const { value, label } = this.props;

        onNodeClick && onNodeClick(value, label);
    }

    render() {
        const {
            value,
            label,
            active,
            children
        } = this.props;

        const {
            expanded
        } = this.state;

        return (
            <li
                className={`
                    my-tree-node
                    ${expanded ? 'my-tree-node--expanded' : ''}
                `}
            >
                <div
                    className={`
                        my-tree-node__parent
                        ${active ? 'my-tree-node__parent--active' : ''}
                    `}
                >
                    <span
                        className="my-tree-node__indicator"
                        onClick={this.handleIndicatorClick}
                    >
                        {children && <i className="icon icon-chevron-right"></i>}
                    </span>
                    <span
                        className="my-tree-node__label"
                        onClick={this.handleNodeClick}
                    >
                        {label}
                    </span>
                </div>

                {children && (
                    <CSSTransition
                        classNames="my-tree-children-"
                        in={expanded}
                        timeout={{ exit: 240 }}
                    >
                        <ul className="my-tree-node__children">
                            {children}
                        </ul>
                    </CSSTransition>    
                )}
            </li>
        )
    }
}

TreeNode.contextTypes = {
    tree: PropTypes.any
}

TreeNode.propTypes = {
    value: PropTypes.any.isRequired,
    label: PropTypes.any.isRequired
}