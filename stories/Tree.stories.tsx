import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TreeExample } from '../src/Tree';

const stories = storiesOf('Tree', module);

stories.add('with layout', () => {
  return <TreeExample />;
});
