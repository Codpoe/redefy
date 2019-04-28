import { configure, addParameters, addDecorator } from '@storybook/react';
import { create } from '@storybook/theming';
import { withInfo } from '@storybook/addon-info';

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(withInfo);

addParameters({
  options: {
    hierarchyRootSeparator: /\s*\|\s*/,
    theme: create({
      colorPrimary: '#1665d8',
      colorSecondary: '#1665d8',
      brandTitle: 'JIMU',
    })
  },
  info: {
    inline: true,
    header: false,
  }
});

configure(loadStories, module);
