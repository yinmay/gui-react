import React, { ReactNode, useState } from 'react';
import { Tree } from './tree';
import './index.scss';

interface IProps {
  //   type: string;
  children?: ReactNode;
  className?: string;
}

export const TreeExample = (props: IProps) => {
  const { className, ...rest } = props;
  const [array, setArray] = useState([
    {
      text: '1',
      value: '1',
      children: [
        {
          text: '1-1',
          value: '1-1'
        }
      ]
    }
  ]);
  return (
    <div {...rest}>
      <Tree sourceData={array} />
    </div>
  );
};
