import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.scss';
import { getScpoedClass } from '../scopedClass';

const scpoedClass = getScpoedClass('gui-button');

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: any;
  children?: ReactNode;
}

export const ExampleButton = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <button className={scpoedClass('', { extra: className })}>
      {props.children}
    </button>
  );
};
