import { configure, addParameters } from '@storybook/react';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addParameters({
  options: {
    hierarchyRootSeparator: /\s*\|\s*/,
  },
});

configure(loadStories, module);
