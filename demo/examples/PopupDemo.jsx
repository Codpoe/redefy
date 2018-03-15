import React from 'react';
import PropTypes from 'prop-types';

import Popup from '../../src/popup/';
import Menu from '../../src/menu/';
import Button from '../../src/button/';

export default class MenuDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            active: false
        };
    }

    render() {
        const menu = (
            <Menu.Self
                menuWidth="100px">
                <Menu.Item value="1">苹果</Menu.Item>
                <Menu.Item value="2">香蕉</Menu.Item>
                <Menu.Item value="3">薯条</Menu.Item>
                <Menu.Divider></Menu.Divider>
                <Menu.Group label="辣鸡食品">
                    <Menu.Item value="4">汉堡包</Menu.Item>
                </Menu.Group>
                <Menu.Sub value="5" label="更多">
                    <Menu.Item value="5-1">牛油果</Menu.Item>
                    <Menu.Item value="5-2">桑葚</Menu.Item>
                </Menu.Sub>
            </Menu.Self>
        )

        return (
            <div>
                <h1>Popup</h1>
                <br />
                <h3>trigger</h3>
                <br />
                <Popup
                    content={menu}
                >
                    hover 弹出<i className="icon-arrow-down"></i>
                </Popup>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Popup
                    content={menu}
                    trigger="click"
                >
                    click 弹出<i className="icon-arrow-down"></i>
                </Popup>
                <br /><br />

                <h3>hideOnClick</h3>
                <br />
                <Popup
                    content={menu}
                    hideOnClick={true}
                >
                    hover 弹出<i className="icon-arrow-down"></i>
                </Popup>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Popup
                    content={menu}
                    trigger="click"
                    hideOnClick={true}
                >
                    click 弹出<i className="icon-arrow-down"></i>
                </Popup>
                <br /><br />
            </div>
        )
    }
}