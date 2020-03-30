import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TreeExample } from '.';

const stories = storiesOf('Tree', module);

stories.add('with layout', () => {
  return <TreeExample />;
});
