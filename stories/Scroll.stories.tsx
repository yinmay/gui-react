import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { ScrollExample } from '../src/Scroll';

const stories = storiesOf('ScrollExample', module);

stories.add('with scroll', () => {
  return <ScrollExample />;
});
