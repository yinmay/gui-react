import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.scss';
import { getScpoedClass } from '../../../src/scopedClass';

const scpoedClass = getScpoedClass('gui-button');

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //   type: string;
  //   children?: ReactNode;
}

export const ExampleButton = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <button className={scpoedClass('', { extra: className })} {...rest}>
      {props.children}
    </button>
  );
};
