import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.scss';
import { getScpoedClass } from '../scopedClass';

const scpoedClass = getScpoedClass('gui-button');

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  type: any;
  children?: ReactNode;

  level?: 'important' | 'normal';
}

export const ExampleButton = (props: IProps) => {
  const { className, level, ...rest } = props;
  return (
    <button className={scpoedClass(`${level}`, { extra: className })}>
      {props.children}
    </button>
  );
};

ExampleButton.defaultProps = {
  level: 'normal'
};
