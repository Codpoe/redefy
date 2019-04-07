import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Link, redirectTo } from '@reach/router';

import docConfig from '../doc.config';

import 'xview/common/base.css';
import 'docs/style/docs.css';

class Docs extends React.Component {
  constructor(props) {
    super(props);
    this.components = {};
    this.state = {
      Md: '',
    };
  }

  componentWillMount() {
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
    return import(`../../src/${name}/README.md`)
      .then((module) => {
        console.log(module);
        const Md = module.default;
        this.setState({ Md });
      })
      .catch((err) => {
        console.log(err);
        this.props.navigate('/introduction');
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
    console.log('render');
    const { name } = this.props;
    const { Md } = this.state;

    return (
      <div className="docs">
        <div className="docs__nav">
          {docConfig.map((config) => (this.renderNavGroup(config)))}
        </div>
        <div className="docs__content">
          {Md && <Md />}
        </div>
      </div>
    );
  }
}

export default Docs;
