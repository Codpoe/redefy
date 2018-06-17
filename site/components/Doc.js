import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link } from '@reach/router';
import marked from 'marked';
import { transform } from 'babel-standalone';

import Xview from '../../src/';
import docConfig from '../doc.config.js';
import allDocs from '../../docs/';

class Doc extends React.Component {
    constructor(props) {
        super(props);
        this.components = {};
    }

    componentDidMount() {
        this.renderComponents();
    }

    // 切换组件时，重新渲染
    componentDidUpdate() {
        this.renderComponents();
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

    md2Html(md) {
        this.components = {};

        return marked(md.replace(/:::\s?demo\s?\n(```.*\n([^]+?)```)\n:::/g, (match, p1, p2, offset) => {
            this.components[offset] = p2;
            return  `<div id="${offset}"></div>\n\n${p1}\n\n`;
        }));
    }

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

        if (!name) {
            return <Redirect to="docs/introduction" noThrow />;
        }

        // const html = marked(allDocs[name], { renderer: this.renderer });
        const html = this.md2Html(allDocs[name]);

        return (
            <div className="doc">
                <div className="doc__nav">
                    {docConfig.map(config => (this.renderNavGroup(config)))}
                </div>
                <div
                    className="doc__content"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </div>
        );
    }
}

export default Doc;
