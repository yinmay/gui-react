import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { FormExample } from '.';

const stories = storiesOf('Form', module);

stories.add('with Form', () => {
  return <FormExample text='' />;
});
