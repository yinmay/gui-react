import { configure, addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import { withKnobs } from '@storybook/addon-knobs';
import './storystyles.css';
import '../node_modules/tachyons/css/tachyons.css';

const req = require.context('../stories', true, /.stories.tsx$/);
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS
  }
});
function loadStories() {
  req.keys().forEach(req);
}

addDecorator(withInfo());
addDecorator(withKnobs);

configure(loadStories, module);
