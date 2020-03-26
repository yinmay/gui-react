import React, { ReactNode, useState } from 'react';
import { Tree, IChild } from './tree';
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
        },
        {
          text: '1-2',
          value: '1-2',
          children: [{ text: '1-2-1', value: '1-2-1' }]
        }
      ]
    }
  ]);

  const [selected, setSelected] = useState(['1']);

  const onChange = (value: string[]) => {
    setSelected(value);
  };

  return (
    <div {...rest}>
      {selected.join(', ')}
      <Tree
        sourceData={array}
        selected={selected}
        onChange={onChange}
        multiple
      />
    </div>
  );
};
