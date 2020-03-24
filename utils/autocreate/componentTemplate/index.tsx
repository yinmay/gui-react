import React from 'react';
import './index.scss';
interface IProps {
  /**
   * Text for the x
   */
  text: string;
}

export const x = (props: IProps) => {
  return <div>{props.text}</div>;
};
