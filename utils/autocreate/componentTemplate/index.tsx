import React, { ReactNode } from 'react';
import './index.scss';
import { getScpoedClass } from '../../../src/scopedClass';

const scpoedClass = getScpoedClass('gui-button');

interface IProps {
  //   type: string;
  children?: ReactNode;
  className?: string;
}

export const ExampleButton = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <button className={scpoedClass('', { extra: className })} {...rest}>
      {props.children}
    </button>
  );
};
