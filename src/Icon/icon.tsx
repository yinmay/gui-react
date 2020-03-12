import React from 'react';
import './button.scss';
interface IProps {
  /**
   * Name for the button
   */
  name: string;
}

const Icon: React.FunctionComponent<IProps> = (props: IProps) => {
  return <a className='f6 link dim br3 ph3 pv2 mb2 dib white bg-light-purple test'>{props.name}</a>;
};

export { Icon };
