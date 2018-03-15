import React from 'react';
import PropTypes from 'prop-types';

import TreeNode from './TreeNode.jsx';

import './tree.css';

export default class Tree extends React.Component {
    constructor(props) {
        super(props);
    }

    getChildContext() {
        return {
            tree: this
        }
    }

    transformData(data, valueProp, labelProp, value) {
        return data.map(item => (
            <TreeNode
                key={item[valueProp]}
                value={item[valueProp]}
                label={item[labelProp]}
                active={value === item[valueProp]}
            >
                {item.children && item.children.length > 0 &&
                    this.transformData(item.children, valueProp, labelProp, value)
                }
            </TreeNode>
        ))
    }

    render() {
        const {
            data,
            valueProp,
            labelProp,
            children,
            value,
            className,
            style
        } = this.props;

        let treeNodes = children;

        if (data) {
            treeNodes = this.transformData(data, valueProp, labelProp, value);
        }

        return (
            <ul
                className={`my-tree ${className}`}
                style={style}
            >
                {treeNodes}
            </ul>
        )
    }
}

Tree.childContextTypes = {
    tree: PropTypes.any
}

Tree.propTypes = {
    valueProp: PropTypes.string,
    labelProp: PropTypes.string,
    onNodeClick: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
}

Tree.defaultProps = {
    valueProp: 'value',
    labelProp: 'label'
}