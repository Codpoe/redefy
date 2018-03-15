import React from 'react';
import PropTypes from 'prop-types';

import Menu from '../../src/menu/';

export default class MenuDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '3'
        }
    }

    render() {
        const {
            selected,
            open
        } = this.state;

        return (
            <div>
                <h1>Menu</h1>
                <h3>normal</h3>
                <br />
                <Menu.Self
                    value={selected}
                    defaultOpen="5"
                    indicatorPosition="left"
                >    
                    <Menu.Item value="1">
                        <span style={{
                            display: 'inline-flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }}>
                            <span>Design Palette</span>
                            <i className="icon-arrow-right"></i>
                        </span>
                    </Menu.Item>
                    <Menu.Item value="2"><i className="icon-download"></i>&nbsp;&nbsp;&nbsp;&nbsp;下载</Menu.Item>
                    <Menu.Divider></Menu.Divider>
                    <Menu.Group label="其他">
                        <Menu.Item value="3"><i className="icon-info"></i>&nbsp;&nbsp;&nbsp;&nbsp;关于</Menu.Item>
                    </Menu.Group>
                    <Menu.Divider></Menu.Divider>
                    <Menu.Sub value="4" label="更多">
                        <Menu.Item value="4-1"><i className="icon-setting"></i>&nbsp;&nbsp;&nbsp;&nbsp;设置</Menu.Item>
                        <Menu.Item value="4-2"><i className="icon-info"></i>&nbsp;&nbsp;&nbsp;&nbsp;4-2</Menu.Item>
                        <Menu.Item value="4-3"><i className="icon-info"></i>&nbsp;&nbsp;&nbsp;&nbsp;4-3</Menu.Item>
                    </Menu.Sub>
                </Menu.Self>
                <br /><br />
                <h3>horizontal</h3>
                <Menu.Self horizontal flat>
                    <Menu.Item value="home">首页</Menu.Item>
                    <Menu.Item value="category">分类</Menu.Item>
                    <Menu.Item value="more">更多东西</Menu.Item>
                </Menu.Self>
            </div>
        )
    }
}