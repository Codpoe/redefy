import React from 'react';
import { render } from 'react-dom';
import { Router, Redirect } from '@reach/router';

import Doc from './components/Doc';
import docConfig from './doc.config.js';

let allConfig = [];

docConfig.forEach(({ list }) => {
    allConfig.concat(list);
});

const App = () => (
    <div className="app">
        <Router>
            <Doc path="docs/:name" />
            <Redirect from="docs" to="docs/introduction" noThrow />
        </Router>
    </div>
);

render(<App />, document.querySelector('#root'));
