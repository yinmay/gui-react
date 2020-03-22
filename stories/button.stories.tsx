import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { ExampleButton } from '../src';

const stories = storiesOf('Button', module);

stories.add('with text', () => <ExampleButton text={text('text', 'Hello')} />, {
  notes: { markdown: '12' }
});

stories.add('with ', () => (
  <ExampleButton text={text('text', '👻 👽 🤖 💩!')} />
));
