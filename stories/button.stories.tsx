import React from 'react';
import { action } from '@storybook/addon-actions';

import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { ExampleButton } from '../src/ExampleButton/button';
// import * as markdown from './';

const stories = storiesOf('Button', module);

stories.add('with text', () => <ExampleButton text={text('text', 'Hello')} />, {
  notes: { markdown: '12' }
});

stories.add('with ', () => (
  <ExampleButton text={text('text', '👻 👽 🤖 💩!')} />
));
