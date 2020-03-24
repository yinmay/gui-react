import React, { InputHTMLAttributes } from 'react';
import { getScpoedClass } from '../scopedClass';
import classes from '../../helpers/classnames';
import './index.scss';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Text for the Input
   */
  // text: string;
}

const scpoedClass = getScpoedClass('gui-input');

export const Input: React.FunctionComponent<IProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <div>
      <input
        className={scpoedClass({ '': true }, { extra: className })}
        type='text'
        {...rest}
      />
    </div>
  );
};
