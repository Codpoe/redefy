import React from 'react';
import { render } from 'react-dom';
import { Router, Redirect } from '@reach/router';

import Doc from './components/Doc';

const App = () => (
    <div className="app">
        <Router>
            <Doc path="docs/:name" />
            <Redirect from="docs" to="docs/introduction" noThrow />
        </Router>
    </div>
);

render(<App />, document.querySelector('#root'));
