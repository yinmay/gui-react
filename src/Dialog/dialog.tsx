import React, { useState, Fragment } from 'react';
import { Content, alert, confirm, modal } from './content';

// tslint:disable-next-line: no-empty-interface
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

export { Dialog };
