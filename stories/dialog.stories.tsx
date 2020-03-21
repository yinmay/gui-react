import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Dialog } from '../src/Dialog/dialog';

const stories = storiesOf('Dialog', module);

stories.add('with dialog', () => {
  return <Dialog />;
});
