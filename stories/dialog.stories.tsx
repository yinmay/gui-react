import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { Dialog } from '../src/Dialog/dialog';

const stories = storiesOf('Dialog', module);

stories.add(
  'with dialog',
  withInfo({
    inline: true,
    text: 'A dialog'
  })(() => {
    return <Dialog />;
  })
);
