import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { FormExample } from '../src/Form';

const stories = storiesOf('FormExample', module);

stories.add('with Form', () => {
  return <FormExample text='' />;
});
