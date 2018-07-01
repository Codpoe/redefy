import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link, redirectTo } from '@reach/router';

import Xview from '../../src/';
import docConfig from '../doc.config.js';

import '../style/doc.css';

class Docs extends React.Component {
    constructor(props) {
        super(props);
        this.components = {};
        this.state = {
            Md: ''
        };
    }

    componentDidMount() {
        // 动态获取文档
        this.fetchMd(this.props.name);
    }

    // 切换组件时，重新渲染
    componentDidUpdate(prevProps, prevState) {
        const { name: prevName } = prevProps;
        const { name } = this.props;
        const { Md } = this.state;

        // 动态获取文档
        if (prevName !== name) {
            this.fetchMd(name);
        }
    }

    // 动态获取文档
    fetchMd(name) {
        return import(`../../docs/zh-CN/${name}.md`)
            .then(module => {
                const Md = module.default;
                this.setState({ Md });
            })
            .catch(err => {
                this.props.navigate('/docs/introduction');
            });
    }

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
        const { Md } = this.state;

        if (!name) {
            return <Redirect to="docs/introduction" noThrow />;
        }

        return (
            <div className="doc">
                <div className="doc__nav">
                    {docConfig.map(config => (this.renderNavGroup(config)))}
                </div>
                <div className="doc__content">
                    {Md && <Md />}
                </div>
            </div>
        );
    }
}

export default Docs;
