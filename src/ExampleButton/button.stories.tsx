import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { ExampleButton } from '..';

const stories = storiesOf('Button', module);

const buttonDefault = () => (
  <ExampleButton type={text('type', 'text')}>ExampleButton</ExampleButton>
);

stories.add('buttonDefault', buttonDefault);
