import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link, redirectTo } from '@reach/router';
import marked from 'marked';
import { transform } from 'babel-standalone';

import Xview from '../../src/';
import docConfig from '../doc.config.js';

import '../style/doc.css';

class Doc extends React.Component {
    constructor(props) {
        super(props);
        this.components = {};
        this.state = {
            md: ''
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
        const { md } = this.state;
        
        // 动态获取文档
        if (prevName !== name) {
            this.fetchMd(name);
        }

        // 如果已存在文档，则渲染组件
        if (md) {
            this.renderComponents();
        }
    }

    // 动态获取文档
    fetchMd(name) {
        return import(`../../docs/zh-CN/${name}.md`)
            .then(md => {
                this.setState({ md });
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

    setupMarked() {
        // this.renderer = new marked.Renderer();
        // this.renderer.code = this.renderer.code.bind(this.renderer);
        // const protoCode = marked.Renderer.prototype.code.bind(this.renderer);
        // const protoParagraph = marked.Renderer.prototype.paragraph.bind(this.renderer);
        // let hadAppear = false;

        // this.renderer.paragraph = text => {
        //     if (!hadAppear && /^:::\s*demo\s*$/.test(text)) {
        //         hadAppear = true;
        //         return '';
        //     } else if (hadAppear && /^:::\s*$/.test(text)) {
        //         hadAppear = false;
        //         return '';
        //     }
        //     return protoParagraph(text);
        // };

        // this.renderer.code = (code, lang, escaped) => {
        //     if (lang && /^\s*(demo|react).*$/.test(lang)) {
        //         const title = lang.replace(/(\s*(demo|react)\s*)/, () => '');
        //         console.log(title);
        //         return `<div id="$"></div>`;
        //     }
        //     return protoCode(code, lang, escaped);
        // };
    }

    // 从 MD 文档中找出所有的 React 组件，并创建组件的挂载节点
    md2Html(md) {
        this.components = {};

        return marked(md.replace(/:::\s?demo\s?\n(```.*\n([^]+?)```)\n:::/g, (match, p1, p2, offset) => {
            this.components[offset] = p2;
            return  `<div id="${offset}"></div>\n\n${p1}\n\n`;
        }));
    }

    // 渲染 MD 文档中的 React 组件
    renderComponents() {
        const argNames = ['React', 'ReactDOM'];
        const args = [React, ReactDOM];

        // 提供所有 Xview 组件
        Object.keys(Xview).forEach(key => {
            argNames.push(key);
            args.push(Xview[key]);
        });

        // 调用 Babel，生成 Demo 组件
        Object.keys(this.components).forEach(key => {
            const code = transform(`
                class Demo extends React.Component {
                    ${this.components[key]}
                }
                ReactDOM.render(<Demo />, document.getElementById("${key}"));
            `, { presets: ['es2015', 'stage-0', 'react'] }).code;

            new Function(...argNames, code)(...args);
        });
    }

    render() {
        const { name } = this.props;
        const { md } = this.state;

        if (!name) {
            return <Redirect to="docs/introduction" noThrow />;
        }

        return (
            <div className="doc">
                <div className="doc__nav">
                    {docConfig.map(config => (this.renderNavGroup(config)))}
                </div>
                <div
                    className="doc__content"
                    dangerouslySetInnerHTML={{ __html: this.md2Html(md) }}
                />
            </div>
        );
    }
}

export default Doc;
