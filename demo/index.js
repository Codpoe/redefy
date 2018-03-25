import React, { Component } from 'react';
import ReactDom from 'react-dom';

import ButtonDemo from './examples/ButtonDemo.jsx';
// import RadioDemo from './examples/RadioDemo.jsx';
// import CheckboxDemo from './examples/CheckboxDemo.jsx';
// import SwitchDemo from './examples/SwitchDemo.jsx';
// import InputDemo from './examples/InputDemo.jsx';
// import FormDemo from './examples/FormDemo.jsx';
// import MenuDemo from './examples/MenuDemo.jsx';
// import PopupDemo from './examples/PopupDemo.jsx';
// import TooltipDemo from './examples/TooltipDemo.jsx';
// import SelectDemo from './examples/SelectDemo.jsx';
// import StickyDemo from './examples/StickyDemo.jsx';
// import PaginationDemo from './examples/PaginationDemo.jsx';
// import TableDemo from './examples/TableDemo.jsx';
// import UploadDemo from './examples/UploadDemo.jsx';
import '../src/common/common.css';
import '../src/common/style.css';
import './index.css';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <ButtonDemo />
                {/* <RadioDemo />
                <CheckboxDemo />
                <SwitchDemo />
                <InputDemo />
                <FormDemo />
                <MenuDemo />
                <PopupDemo />
                <TooltipDemo />
                <SelectDemo />
                <PaginationDemo />
                <TableDemo />
                <UploadDemo /> */}
            </div>
        )
    }
}

ReactDom.render(<App />, document.querySelector('#root'));
