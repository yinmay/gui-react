import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Dialog } from '../src';

const stories = storiesOf('Dialog', module);

stories.add('with dialog', () => {
  return <Dialog />;
});
