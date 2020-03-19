import React, { useState } from 'react';
import { Content } from './Content';

interface IProps {
  /**
   * Name for the button
   */
  name: string;
}

const Dialog = (props: IProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setVisible(!visible)}>open Dialog</button>
      <Content visible={visible}>
        <div>dialog</div>
      </Content>
    </div>
  );
};

export { Dialog };
