import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Input } from '../src/Input';

const stories = storiesOf('InputExample', module);

stories.add('with layout', () => {
  return <Input />;
});
