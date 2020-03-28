import React, { ReactNode, HTMLAttributes } from 'react';
import './index.scss';
import { getScpoedClass } from '../scopedClass';

const scpoedClass = getScpoedClass('gui-scroll');

interface IProps extends HTMLAttributes<HTMLDivElement> {
  //   type: string;
  children?: ReactNode;
  className?: string;
}

export const Scroll = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <div className={scpoedClass('')} {...rest}>
      <div className={scpoedClass('inner')}>{props.children}</div>
    </div>
  );
};
