// import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Content, alert, confirm, modal } from './Content';

import React, { useState } from 'react';

interface IProps {
  /**
   * Name for the button
   */
  // name: string;
}

const Dialog = (props?: IProps) => {
  const [visible, setVisible] = useState(false);
  const openModal = () => {
    const close = modal(<button onClick={() => close()}>close</button>);
  };

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>open Dialog</button>
      <button onClick={() => alert('string')}>open alert</button>
      <button onClick={() => confirm('confirm')}>open confirm</button>
      <button onClick={openModal}>open modal</button>
      <button
        onClick={() =>
          confirm(
            'string',
            () => setVisible(false),
            () => setVisible(false)
          )
        }
      >
        open Dialog
      </button>
      <Content
        closeOnClickMask={true}
        onClose={() => setVisible(false)}
        visible={visible}
        buttons={[
          <button onClick={() => setVisible(false)}>1</button>,
          <button onClick={() => setVisible(false)}>2</button>
        ]}
      >
        <div>dialog</div>
      </Content>
    </div>
  );
};

const stories = storiesOf('Dialog', module);

stories.add('with dialog', Dialog);
