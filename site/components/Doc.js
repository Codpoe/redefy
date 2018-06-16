import React from 'react';
import { Redirect, Link } from '@reach/router';

import docConfig from '../doc.config.js';
import allDocs from '../../docs/';
import toCamelCase from '../utils/toCamelCase.js';

class Doc extends React.Component {
    renderNavGroup({ groupName, list }) {
        return (
            <ul className="doc__nav-group" key={groupName}>
                {list.map(({ title, doc }) => (
                    <li className="doc__nav-item" key={title}>
                        <Link to={`../${doc}`}>{title}</Link>
                    </li>
                ))}
            </ul>
        );
    }

    render() {
        const { name } = this.props;
        const Node = allDocs[toCamelCase(name)];

        if (!Node) {
            return <Redirect to="docs/introduction" noThrow />;
        }

        return (
            <div className="doc">
                <div className="doc__nav">
                    {docConfig.map(config => (this.renderNavGroup(config)))}
                </div>    
                <Node />
            </div>
        );
    }
}

export default Doc;
