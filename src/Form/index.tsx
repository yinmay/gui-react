import React from 'react';
interface IProps {
  /**
   * Text for the FormExample
   */
  text: string;
}

export const FormExample = (props: IProps) => {
  return <div>{props.text}</div>;
};
