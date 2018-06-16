import React from 'react';

import Button from '../../src/button/';

const ButtonDemo = () => {
    return (
        <div>
            <h1>Button</h1>
            <br />
            <h3>一般</h3>
            <br />
            <Button>默认按钮</Button>&nbsp;
            <Button type="primary">主要按钮</Button>&nbsp;
            <Button type="success">成功按钮</Button>&nbsp;
            <Button type="warning">警告按钮</Button>&nbsp;
            <Button type="error">危险按钮</Button>&nbsp;
            <br /> <br />
            <h3>镂空 hollow</h3>
            <br />
            <Button hollow>默认按钮</Button>&nbsp;
            <Button type="primary" hollow>边框按钮</Button>&nbsp;
            <Button type="success" hollow>边框按钮</Button>&nbsp;
            <Button type="warning" hollow>边框按钮</Button>&nbsp;
            <Button type="error" hollow>边框按钮</Button>
            <br /> <br />
            <h3>文字 text</h3>
            <br />
            <Button text>默认按钮</Button>&nbsp;
            <Button type="primary" text>文字按钮</Button>&nbsp;
            <Button type="success" text>文字按钮</Button>&nbsp;
            <Button type="warning" text>文字按钮</Button>&nbsp;
            <Button type="error" text>文字按钮</Button>
            <br /> <br />
            <h3>两边圆形 round</h3>
            <br />
            <Button round>圆形按钮</Button>&nbsp;
            <Button type="primary" hollow round>圆形按钮</Button>
            <br /> <br />
            <h3>全圆形 circle</h3>
            <br />
            <Button circle size="large"><i className="icon icon-search"></i></Button>&nbsp;
            <Button circle hollow type="primary"><i className="icon icon-search"></i></Button>&nbsp;
            <Button circle type="primary" size="small"><i className="icon icon-search"></i></Button>
            <br /><br />
            <h3>带图标</h3>
            <br />
            <Button><i className="icon icon-upload"></i>&nbsp;带图标按钮</Button>&nbsp;
            <Button hollow type="primary"><i className="icon icon-download"></i>&nbsp;带图标按钮</Button>
            <br /> <br />
            <h3>尺寸 size</h3>
            <br />
            <Button size="large">大型按钮</Button>&nbsp;
            <Button size="normal">普通按钮</Button>&nbsp;
            <Button size="small">小型按钮</Button>
            <br /> <br />
            <h3>禁用 disabled</h3>
            <br />
            <Button disabled>禁用按钮</Button>&nbsp;
            <Button hollow disabled>禁用按钮</Button>&nbsp;
            <Button text disabled>禁用按钮</Button>
            <br /> <br />
            <h3>a 链接</h3>
            <br />
            <Button href="http://t.tt" target="_blank" type="primary" round hollow>内嵌 a 标签</Button>
            <br /> <br />
            <h3>块级 block</h3>
            <br />
            <Button block>块级按钮</Button>
            <br /><br />
            <Button hollow round block>块级按钮</Button>
            <br /><br />
            <h3>组合按钮</h3>
            <br />
            <Button.Group>
                <Button>过去</Button>
                <Button>现在</Button>
                <Button>未来</Button>
            </Button.Group>
        </div>
    );
};

export default ButtonDemo;
