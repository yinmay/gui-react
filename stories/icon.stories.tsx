import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';
import { Icon } from '../src/Icon/icon';

const stories = storiesOf('Icon', module);

stories.add(
  'with icon',
  withInfo({
    inline: true,
    text: 'A simple button'
  })(() => <Icon name={text('name', 'Hello')} />)
);
